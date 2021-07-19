import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmChangeEmailComponent } from './confirm-change-email.component';

describe('ConfirmChangeEmailComponent', () => {
  let component: ConfirmChangeEmailComponent;
  let fixture: ComponentFixture<ConfirmChangeEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmChangeEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmChangeEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
