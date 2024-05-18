import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesCatalogSkeletonComponent } from './movies-catalog-skeleton.component';

describe('MoviesCatalogSkeletonComponent', () => {
  let component: MoviesCatalogSkeletonComponent;
  let fixture: ComponentFixture<MoviesCatalogSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesCatalogSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoviesCatalogSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
