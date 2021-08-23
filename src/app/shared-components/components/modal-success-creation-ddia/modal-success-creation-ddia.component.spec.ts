import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSuccessCreationDDIAComponent } from './modal-success-creation-ddia.component';

describe('ModalSuccessCreationDDIAComponent', () => {
  let component: ModalSuccessCreationDDIAComponent;
  let fixture: ComponentFixture<ModalSuccessCreationDDIAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSuccessCreationDDIAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSuccessCreationDDIAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
