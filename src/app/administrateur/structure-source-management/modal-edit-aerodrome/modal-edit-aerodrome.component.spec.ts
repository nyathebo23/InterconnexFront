import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditAerodromeComponent } from './modal-edit-aerodrome.component';

describe('ModalEditAerodromeComponent', () => {
  let component: ModalEditAerodromeComponent;
  let fixture: ComponentFixture<ModalEditAerodromeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditAerodromeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditAerodromeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
