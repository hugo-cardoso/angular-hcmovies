import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieHeroComponent } from './movie-hero.component';

describe('MovieHeroComponent', () => {
  let component: MovieHeroComponent;
  let fixture: ComponentFixture<MovieHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieHeroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
