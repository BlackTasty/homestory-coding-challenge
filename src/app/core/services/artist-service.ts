import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LastFMConnection } from "../lastfm-connection";

@Injectable({
  providedIn: 'root'
})
export class ArtistService extends LastFMConnection {
  constructor(private httpClient: HttpClient) {
    super();
  }

  public getTopArtistsForCountry(countryName: string): Observable<any> {
    let url = this.constructUrl("geo.gettopartists&country=" + countryName);

    return this.httpClient.get(url);
  }

  public getArtistDetails(mbid: string): Observable<any> {
    let url = this.constructUrl("artist.getinfo&mbid=" + mbid);

    return this.httpClient.get(url);
  }

  public getArtistImage(mbid: string): Observable<any> {
    return this.httpClient.get('https://musicbrainz.org/ws/2/artist/' + mbid + '?inc=url-rels&fmt=json');
  }

  public searchArtists(name: string): Observable<any> {
    let url = this.constructUrl("artist.search&artist=" + name);

    return this.httpClient.get(url);
  }

  public getSimilarArtists(mbid: string, limit: number = 5): Observable<any> {
    let url = this.constructUrl("artist.getsimilar&mbid=" + mbid + "&limit=" + limit);

    return this.httpClient.get(url);
  }

  public getTopAlbums(mbid: string, limit: number = 6): Observable<any> {
    let url = this.constructUrl("artist.gettopalbums&mbid=" + mbid + "&limit=" + limit);

    return this.httpClient.get(url);
  }

  public getTopTracks(mbid: string, limit: number = 6): Observable<any> {
    let url = this.constructUrl("artist.gettoptracks&mbid=" + mbid + "&limit=" + limit);

    return this.httpClient.get(url);
  }

  // Helper function to quickly generate API urls
  private constructUrl(data: string) {
    return this.baseAddress + data + "&api_key=" + this.apiCode + "&format=json";
  }
}
