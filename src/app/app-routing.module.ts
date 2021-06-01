import { ArtistComparisonComponent } from './components/artist-comparison/artist-comparison.component';
import { ArtistSearchResultComponent } from './components/artist-search-result/artist-search-result.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { ArtistDetailsComponent } from './components/artist-details/artist-details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'search/:name', component: ArtistSearchResultComponent },
  { path: 'search', component: ArtistSearchResultComponent },
  { path: 'details/:mbid', component: ArtistDetailsComponent },
  { path: 'compare', component: ArtistComparisonComponent, children: [
      { path: 'search/:name', component: ArtistSearchResultComponent, outlet: 'compareLeft' },
      { path: 'search', component: ArtistSearchResultComponent, outlet: 'compareLeft' },
      { path: 'search/:name', component: ArtistSearchResultComponent, outlet: 'compareRight' },
      { path: 'search', component: ArtistSearchResultComponent, outlet: 'compareRight' },
      { path: 'details/:mbid', component: ArtistDetailsComponent, outlet: 'compareLeft' },
      { path: 'details/:mbid', component: ArtistDetailsComponent, outlet: 'compareRight' }
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor (router: Router) {
    router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

}
