import { ArtistService } from './../services/artist-service';
import { Album } from './album';
import { Track } from './track';
export class Artist {
  public name: string = "";
  public listeners: number = 0;
  public imageUrl: string = "";
  public bannerUrl: string = "";
  public imageCss: string = "";
  public mbid: string = "";

  // Only populated when "loadDetails" in constructor is true
  public isOnTour: boolean = false;
  public similarArtists: Artist[] = [];
  public tags: string[] = [];
  public summary: string = "";
  public topAlbums: Album[] = [];
  public topTracks: Track[] = [];

  // Accepts a parsed json object and fills in all available variables
  constructor(jsonData: any, artistService: ArtistService, loadDetails: boolean) {
    if (!jsonData) {
      return;
    }

    if (loadDetails) {
      // If data has been pulled via "artist.getInfo", set current jsonData to artist key of jsonData
      jsonData = jsonData.artist;
    }

    this.name = jsonData.name;
    this.listeners = jsonData.listeners;
    this.mbid = jsonData.mbid;

    if (this.mbid && artistService) {
       //Retrieve artist image from MusicBrainz with id (LastFM made changes to their API so images return a white star)
      artistService.getArtistImage(this.mbid).subscribe(result => {
        const relations = result.relations;

        // Loops through the result json object and searches for a key named "image"
        for (let i = 0; i < relations.length; i++) {
          if (relations[i].type === 'image') {
              // If image key has been found, parse the URL into an acceptable format
              let tempUrl: string = relations[i].url.resource;
              if (tempUrl.startsWith('https://commons.wikimedia.org/wiki/File:')) {
                // Get cropped variant as "profile" picture
                const filenameCropped: string = tempUrl.substring(tempUrl.lastIndexOf('/') + 1);
                this.imageUrl = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/' + filenameCropped;

                // Get uncropped variant as banner picture
                const filename: string = filenameCropped.replace('-cropped.jpg', '.jpg');
                this.bannerUrl = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/' + filename;
                this.imageCss = "url(" + this.bannerUrl + ")";
              }
          }
      }
      });
    }

    if (loadDetails) {
      if (jsonData.ontour) {
        this.isOnTour = jsonData.ontour == "1";
      }

      if (jsonData.tags && jsonData.tags.tag) {
        jsonData.tags.tag.forEach((tagJson: any) => {
          this.tags.push(tagJson.name);
        });
      }

      if (jsonData.bio && jsonData.bio.content) {
        this.summary = jsonData.bio.content;
      }

      // Retrieve artists similar to this, limited to 6 entries
      artistService.getSimilarArtists(this.mbid, 6).subscribe(result => {
        if (result?.similarartists?.artist) {
          result.similarartists.artist.forEach((similarArtistData: any) => {
            this.similarArtists.push(new Artist(similarArtistData, artistService, false));
          });
        }
      });

      if (this.mbid && artistService) {
        artistService.getTopAlbums(this.mbid, 6).subscribe(result => {
          if (result?.topalbums?.album) {
            result.topalbums.album.forEach((albumData: any) => {
              this.topAlbums.push(new Album(albumData));
            });
          }
        });

        artistService.getTopTracks(this.mbid, 6).subscribe(result => {
          if (result?.toptracks?.track) {
            result.toptracks.track.forEach((trackData: any) => {
              this.topTracks.push(new Track(trackData));
            });
          }
        });
      }
    }
  }
}
