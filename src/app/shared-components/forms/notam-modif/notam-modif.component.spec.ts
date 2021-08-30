import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NOTAMModifComponent } from './notam-modif.component';

describe('NOTAMModifComponent', () => {
  let component: NOTAMModifComponent;
  let fixture: ComponentFixture<NOTAMModifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NOTAMModifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NOTAMModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
