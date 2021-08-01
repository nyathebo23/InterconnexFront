import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlDDIAConfirmModalcontentComponent } from './control-ddia-confirm-modalcontent.component';

describe('ControlDDIAConfirmModalcontentComponent', () => {
  let component: ControlDDIAConfirmModalcontentComponent;
  let fixture: ComponentFixture<ControlDDIAConfirmModalcontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlDDIAConfirmModalcontentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlDDIAConfirmModalcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
