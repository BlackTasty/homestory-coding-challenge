import { Artist } from 'src/app/core/model/artist';
import { Component, DoCheck, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from 'src/app/core/services/artist-service';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-artist-search-result',
  templateUrl: './artist-search-result.component.html',
  styleUrls: ['./artist-search-result.component.scss']
})
export class ArtistSearchResultComponent implements OnInit, OnDestroy {
  // Toggles functionality of search box
  @Input("isCompareMode")
  public isCompareMode: boolean = false;

  // Only fired if "isCompareMode" is true and an artist has been selected
  @Output("artistSelected")
  public artistSelected = new EventEmitter();

  public results: Artist[] = [];
  public artistName: string = "";
  public currentSearch: string = "";

  // Used only if "isCompareMode" is true. Controls the delay between user input and execution of search
  private modelChanged: Subject<string> = new Subject<string>();
  private subscription: Subscription = null as any;
  // Time of no input in ms
  private debounceTime = 250;

  constructor(private route: ActivatedRoute,
              private artistService: ArtistService,
              private router: Router,
              public domSanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    if (!this.isCompareMode) {
      this.route.params.subscribe(params => {
        const name = params["name"];

        if (name != this.artistName) {
          this.artistName = name;
          this.searchArtists();
        }
      });
    } else {
      this.subscription = this.modelChanged
        .pipe(
          debounceTime(this.debounceTime),
        )
        .subscribe(() => {
          this.searchArtists();
        });
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  public onSearchClicked() {
    if (!this.isCompareMode) {
      this.router.navigate(['/search/' + this.artistName]);
    } else {
      this.searchArtists();
    }
  }

  public onArtistSelected(mbid: string) {
    if (!this.isCompareMode) {
      this.router.navigate(['/details/' + mbid]);
    } else {
      this.artistSelected.emit(mbid);
    }
  }

  public onQueryChanged() {
    if (this.isCompareMode) {
      this.modelChanged.next();
    }
  }

  public searchArtists() {
    this.currentSearch = this.artistName;
    this.artistService.searchArtists(this.artistName).subscribe(result => {
      // Null checks against result json object
      if (result?.results?.artistmatches?.artist) {
        result.results.artistmatches.artist.forEach((artist: any) => {
          this.results.push(new Artist(artist, this.artistService, false));
        });
      }
    });
  }
}
