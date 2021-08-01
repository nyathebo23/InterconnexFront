import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifSourceListDDIAProcessedComponent } from './verif-source-list-ddia-processed.component';

describe('VerifSourceListDDIAProcessedComponent', () => {
  let component: VerifSourceListDDIAProcessedComponent;
  let fixture: ComponentFixture<VerifSourceListDDIAProcessedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifSourceListDDIAProcessedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifSourceListDDIAProcessedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
