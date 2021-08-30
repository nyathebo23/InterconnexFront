import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditLocalInformerComponent } from './modal-edit-local-informer.component';

describe('ModalEditLocalInformerComponent', () => {
  let component: ModalEditLocalInformerComponent;
  let fixture: ComponentFixture<ModalEditLocalInformerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditLocalInformerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditLocalInformerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
