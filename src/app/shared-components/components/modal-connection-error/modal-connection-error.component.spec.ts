import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConnectionErrorComponent } from './modal-connection-error.component';

describe('ModalConnectionErrorComponent', () => {
  let component: ModalConnectionErrorComponent;
  let fixture: ComponentFixture<ModalConnectionErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConnectionErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConnectionErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
