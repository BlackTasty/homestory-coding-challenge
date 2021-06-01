import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  public searchInput: string = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public onSearchClicked() {
    this.router.navigate(['/search/' + this.searchInput]);
    /*this.router.navigate(['/search'], {
      queryParams: new HttpParams().set('name', this.searchInput)
    });*/
  }
}
