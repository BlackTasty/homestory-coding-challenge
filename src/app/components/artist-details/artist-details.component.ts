import { Artist } from 'src/app/core/model/artist';
import { ArtistService } from './../../core/services/artist-service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss']
})
export class ArtistDetailsComponent implements OnInit {
  @Input("mbid")
  public set mbid(val: string) {
    this._mbid = val;
    this.loadDetails();
  }
  private _mbid: string = "";

  @Input("isCompareMode")
  public isCompareMode: boolean = false;

  public artist: Artist = null as any;

  constructor(private route: ActivatedRoute,
              private artistService: ArtistService,
              public domSanitizer: DomSanitizer) {
    this.route.params.subscribe(params => {
      this.mbid = params["mbid"];
    });
  }

  ngOnInit(): void {
  }

  public loadDetails() {
    this.artistService.getArtistDetails(this._mbid).subscribe(result => {
      this.artist = new Artist(result, this.artistService, true);
    });
  }
}
