import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NOTAMItemComponent } from './notam-item.component';

describe('NOTAMItemComponent', () => {
  let component: NOTAMItemComponent;
  let fixture: ComponentFixture<NOTAMItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NOTAMItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NOTAMItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
