import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalinfListDDIAProcessedComponent } from './localinf-list-ddia-processed.component';

describe('LocalinfListDDIAProcessedComponent', () => {
  let component: LocalinfListDDIAProcessedComponent;
  let fixture: ComponentFixture<LocalinfListDDIAProcessedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalinfListDDIAProcessedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalinfListDDIAProcessedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
