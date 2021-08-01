import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SUPPAIPWithDataComponent } from './suppaip-with-data.component';

describe('SUPPAIPWithDataComponent', () => {
  let component: SUPPAIPWithDataComponent;
  let fixture: ComponentFixture<SUPPAIPWithDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SUPPAIPWithDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SUPPAIPWithDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
