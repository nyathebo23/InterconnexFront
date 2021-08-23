import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReceiveDDIANotifComponent } from './modal-receive-ddia-notif.component';

describe('ModalReceiveDDIANotifComponent', () => {
  let component: ModalReceiveDDIANotifComponent;
  let fixture: ComponentFixture<ModalReceiveDDIANotifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalReceiveDDIANotifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalReceiveDDIANotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
