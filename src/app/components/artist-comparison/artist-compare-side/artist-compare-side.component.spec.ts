import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistCompareSideComponent } from './artist-compare-side.component';

describe('ArtistCompareSideComponent', () => {
  let component: ArtistCompareSideComponent;
  let fixture: ComponentFixture<ArtistCompareSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistCompareSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistCompareSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
