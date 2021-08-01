import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NOTAMWithDataComponent } from './notam-with-data.component';

describe('NOTAMWithDataComponent', () => {
  let component: NOTAMWithDataComponent;
  let fixture: ComponentFixture<NOTAMWithDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NOTAMWithDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NOTAMWithDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
