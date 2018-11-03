import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarterProfileComponent } from './starter-profile.component';

describe('StarterProfileComponent', () => {
  let component: StarterProfileComponent;
  let fixture: ComponentFixture<StarterProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarterProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarterProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
