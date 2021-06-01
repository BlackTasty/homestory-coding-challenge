import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { ArtistDetailsComponent } from './components/artist-details/artist-details.component';
import { MaterialModule } from './material.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { ArtistSearchResultComponent } from './components/artist-search-result/artist-search-result.component';
import { FormsModule } from '@angular/forms';
import { ArtistComparisonComponent } from './components/artist-comparison/artist-comparison.component';
import { ArtistCompareSideComponent } from './components/artist-comparison/artist-compare-side/artist-compare-side.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    ArtistDetailsComponent,
    PageNotFoundComponent,
    ArtistSearchResultComponent,
    ArtistComparisonComponent,
    ArtistCompareSideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
