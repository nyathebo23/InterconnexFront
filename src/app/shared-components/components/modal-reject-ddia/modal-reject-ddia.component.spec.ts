import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRejectDDIAComponent } from './modal-reject-ddia.component';

describe('ModalRejectDDIAComponent', () => {
  let component: ModalRejectDDIAComponent;
  let fixture: ComponentFixture<ModalRejectDDIAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRejectDDIAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRejectDDIAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
