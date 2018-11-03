import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarterAddeditSellerComponent } from './starter-addedit-seller.component';

describe('StarterAddeditSellerComponent', () => {
  let component: StarterAddeditSellerComponent;
  let fixture: ComponentFixture<StarterAddeditSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarterAddeditSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarterAddeditSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
