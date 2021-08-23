import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DDIAActionsListComponent } from './ddia-actions-list.component';

describe('DDIAActionsListComponent', () => {
  let component: DDIAActionsListComponent;
  let fixture: ComponentFixture<DDIAActionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DDIAActionsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DDIAActionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
