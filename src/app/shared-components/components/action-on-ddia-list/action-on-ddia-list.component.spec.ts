import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionOnDDIAListComponent } from './action-on-ddia-list.component';

describe('ActionOnDDIAListComponent', () => {
  let component: ActionOnDDIAListComponent;
  let fixture: ComponentFixture<ActionOnDDIAListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionOnDDIAListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionOnDDIAListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
