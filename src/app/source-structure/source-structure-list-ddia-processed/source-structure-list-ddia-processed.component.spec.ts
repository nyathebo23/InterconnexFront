import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceStructureListDDIAProcessedComponent } from './source-structure-list-ddia-processed.component';

describe('SourceStructureListDDIAProcessedComponent', () => {
  let component: SourceStructureListDDIAProcessedComponent;
  let fixture: ComponentFixture<SourceStructureListDDIAProcessedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SourceStructureListDDIAProcessedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceStructureListDDIAProcessedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
