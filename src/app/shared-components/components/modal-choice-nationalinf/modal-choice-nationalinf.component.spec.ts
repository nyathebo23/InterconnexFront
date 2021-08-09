import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChoiceNationalinfComponent } from './modal-choice-nationalinf.component';

describe('ModalChoiceNationalinfComponent', () => {
  let component: ModalChoiceNationalinfComponent;
  let fixture: ComponentFixture<ModalChoiceNationalinfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalChoiceNationalinfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalChoiceNationalinfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
