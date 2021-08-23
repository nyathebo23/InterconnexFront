import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmRelanceComponent } from './modal-confirm-relance.component';

describe('ModalConfirmRelanceComponent', () => {
  let component: ModalConfirmRelanceComponent;
  let fixture: ComponentFixture<ModalConfirmRelanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConfirmRelanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmRelanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
