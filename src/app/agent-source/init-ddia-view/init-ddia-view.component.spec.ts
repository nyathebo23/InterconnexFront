import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitDDIAViewComponent } from './init-ddia-view.component';

describe('InitDDIAViewComponent', () => {
  let component: InitDDIAViewComponent;
  let fixture: ComponentFixture<InitDDIAViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitDDIAViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitDDIAViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
