import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalinfListDDIAProcessedComponent } from './nationalinf-list-ddia-processed.component';

describe('NationalinfListDDIAProcessedComponent', () => {
  let component: NationalinfListDDIAProcessedComponent;
  let fixture: ComponentFixture<NationalinfListDDIAProcessedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NationalinfListDDIAProcessedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalinfListDDIAProcessedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
