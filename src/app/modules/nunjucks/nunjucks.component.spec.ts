import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NunjucksComponent } from './nunjucks.component';

describe('NunjucksComponent', () => {
  let component: NunjucksComponent;
  let fixture: ComponentFixture<NunjucksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NunjucksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NunjucksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
