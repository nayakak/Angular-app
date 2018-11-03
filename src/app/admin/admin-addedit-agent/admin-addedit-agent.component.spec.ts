import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddeditAgentComponent } from './admin-addedit-agent.component';

describe('AdminAddeditAgentComponent', () => {
  let component: AdminAddeditAgentComponent;
  let fixture: ComponentFixture<AdminAddeditAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddeditAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddeditAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
