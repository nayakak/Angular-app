import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarterAddeditPropertyComponent } from './starter-addedit-property.component';

describe('StarterAddeditPropertyComponent', () => {
  let component: StarterAddeditPropertyComponent;
  let fixture: ComponentFixture<StarterAddeditPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarterAddeditPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarterAddeditPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
