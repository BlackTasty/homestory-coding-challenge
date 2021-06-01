import { ArtistRank } from './../../core/model/artist-rank';
import { ArtistService } from './../../core/services/artist-service';
import { Component, OnInit } from '@angular/core';
import { FixedValues } from 'src/app/core/fixed-values';
import { Artist } from 'src/app/core/model/artist';
import { Country } from 'src/app/core/model/country';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public countries: Country[] = FixedValues.countries;
  public selectedCountryIndex: string = "AT";
  public selectedCountryName: string = "Austria";
  public ranking: ArtistRank[] = [];

  constructor(private artistService : ArtistService,
              public domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.onRefreshTopArtists();
  }

  public onRefreshTopArtists() {
    this.selectedCountryName = this.countries.filter(x => x.countryCode == this.selectedCountryIndex)[0].name;
    this.artistService.getTopArtistsForCountry(this.selectedCountryName).subscribe(result => {
      if (result.topartists && result.topartists.artist) {
        this.ranking = [];
        for (let rank = 1; rank <= 10; rank++) {
          this.ranking.push(new ArtistRank(rank, new Artist(result.topartists.artist[rank], this.artistService, false)));
        }
      }
    });
  }
}
