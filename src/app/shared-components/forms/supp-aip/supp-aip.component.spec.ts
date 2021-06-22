import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SUPPAIPComponent } from './supp-aip.component';

describe('SUPPAIPComponent', () => {
  let component: SUPPAIPComponent;
  let fixture: ComponentFixture<SUPPAIPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SUPPAIPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SUPPAIPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
