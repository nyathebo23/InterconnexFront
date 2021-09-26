import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNotifRejectComponent } from './modal-notif-reject.component';

describe('ModalNotifRejectComponent', () => {
  let component: ModalNotifRejectComponent;
  let fixture: ComponentFixture<ModalNotifRejectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNotifRejectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNotifRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
