import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsDDIAComponent } from './units-ddia.component';

describe('UnitsDDIAComponent', () => {
  let component: UnitsDDIAComponent;
  let fixture: ComponentFixture<UnitsDDIAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitsDDIAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitsDDIAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
