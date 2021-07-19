import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfNationalManagementComponent } from './inf-national-management.component';

describe('InfNationalManagementComponent', () => {
  let component: InfNationalManagementComponent;
  let fixture: ComponentFixture<InfNationalManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfNationalManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfNationalManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
