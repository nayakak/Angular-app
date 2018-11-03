import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarterListpropSellerComponent } from './starter-listprop-seller.component';

describe('StarterListpropSellerComponent', () => {
  let component: StarterListpropSellerComponent;
  let fixture: ComponentFixture<StarterListpropSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarterListpropSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarterListpropSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
