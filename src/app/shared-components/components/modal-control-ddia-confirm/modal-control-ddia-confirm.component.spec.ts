import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalControlDDIAConfirmComponent } from './modal-control-ddia-confirm.component';

describe('ModalControlDDIAConfirmComponent', () => {
  let component: ModalControlDDIAConfirmComponent;
  let fixture: ComponentFixture<ModalControlDDIAConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalControlDDIAConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalControlDDIAConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
