import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDDIAProcessedComponent } from './list-ddia-processed.component';

describe('ListDDIAProcessedComponent', () => {
  let component: ListDDIAProcessedComponent;
  let fixture: ComponentFixture<ListDDIAProcessedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDDIAProcessedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDDIAProcessedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
