import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-artist-comparison',
  templateUrl: './artist-comparison.component.html',
  styleUrls: ['./artist-comparison.component.scss']
})
export class ArtistComparisonComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
