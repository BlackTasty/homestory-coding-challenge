import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-artist-compare-side',
  templateUrl: './artist-compare-side.component.html',
  styleUrls: ['./artist-compare-side.component.scss']
})
export class ArtistCompareSideComponent implements OnInit {
  public isSearching = true;
  public mbid = "";

  constructor() { }

  ngOnInit(): void {
  }

  public onArtistSelected(mbid: string) {
    this.isSearching = false;
    this.mbid = mbid;
  }

  public onBackToSearchClicked() {
    this.isSearching = true;
  }
}
