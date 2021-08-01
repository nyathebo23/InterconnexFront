import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsDDIAListComponent } from './units-ddia-list.component';

describe('UnitsDDIAListComponent', () => {
  let component: UnitsDDIAListComponent;
  let fixture: ComponentFixture<UnitsDDIAListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitsDDIAListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitsDDIAListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
