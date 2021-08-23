import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmCancelDDIAComponent } from './modal-confirm-cancel-ddia.component';

describe('ModalConfirmCancelDDIAComponent', () => {
  let component: ModalConfirmCancelDDIAComponent;
  let fixture: ComponentFixture<ModalConfirmCancelDDIAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConfirmCancelDDIAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmCancelDDIAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
