import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfLocalManagementComponent } from './inf-local-management.component';

describe('InfLocalManagementComponent', () => {
  let component: InfLocalManagementComponent;
  let fixture: ComponentFixture<InfLocalManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfLocalManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfLocalManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
