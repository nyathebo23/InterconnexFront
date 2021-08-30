import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditUnitComponent } from './modal-edit-unit.component';

describe('ModalEditUnitComponent', () => {
  let component: ModalEditUnitComponent;
  let fixture: ComponentFixture<ModalEditUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
