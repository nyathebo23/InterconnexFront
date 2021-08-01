import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceStructureListDDIAReceivedComponent } from './source-structure-list-ddia-received.component';

describe('SourceStructureListDDIAReceivedComponent', () => {
  let component: SourceStructureListDDIAReceivedComponent;
  let fixture: ComponentFixture<SourceStructureListDDIAReceivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SourceStructureListDDIAReceivedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceStructureListDDIAReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
