import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarterSellerComponent } from './starter-seller.component';

describe('StarterSellerComponent', () => {
  let component: StarterSellerComponent;
  let fixture: ComponentFixture<StarterSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarterSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarterSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
