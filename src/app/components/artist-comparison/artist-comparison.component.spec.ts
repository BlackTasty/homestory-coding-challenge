import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistComparisonComponent } from './artist-comparison.component';

describe('ArtistComparisonComponent', () => {
  let component: ArtistComparisonComponent;
  let fixture: ComponentFixture<ArtistComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistComparisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
