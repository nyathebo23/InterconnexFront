import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNotifStateChangeComponent } from './modal-notif-state-change.component';

describe('ModalNotifStateChangeComponent', () => {
  let component: ModalNotifStateChangeComponent;
  let fixture: ComponentFixture<ModalNotifStateChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNotifStateChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNotifStateChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
