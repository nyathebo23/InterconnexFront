import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsErroneousDDIAComponent } from './units-erroneous-ddia.component';

describe('UnitsErroneousDDIAComponent', () => {
  let component: UnitsErroneousDDIAComponent;
  let fixture: ComponentFixture<UnitsErroneousDDIAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitsErroneousDDIAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitsErroneousDDIAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
