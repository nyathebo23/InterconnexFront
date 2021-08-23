import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPublishDDIAComponent } from './modal-publish-ddia.component';

describe('ModalPublishDDIAComponent', () => {
  let component: ModalPublishDDIAComponent;
  let fixture: ComponentFixture<ModalPublishDDIAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPublishDDIAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPublishDDIAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
