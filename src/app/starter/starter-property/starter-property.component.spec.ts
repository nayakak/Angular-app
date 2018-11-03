import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarterPropertyComponent } from './starter-property.component';

describe('StarterPropertyComponent', () => {
  let component: StarterPropertyComponent;
  let fixture: ComponentFixture<StarterPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarterPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarterPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
