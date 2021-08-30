import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditNationalInformerComponent } from './modal-edit-national-informer.component';

describe('ModalEditNationalInformerComponent', () => {
  let component: ModalEditNationalInformerComponent;
  let fixture: ComponentFixture<ModalEditNationalInformerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditNationalInformerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditNationalInformerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
