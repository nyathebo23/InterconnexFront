import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyDDIAListComponent } from './empty-ddia-list.component';

describe('EmptyDDIAListComponent', () => {
  let component: EmptyDDIAListComponent;
  let fixture: ComponentFixture<EmptyDDIAListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyDDIAListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyDDIAListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
