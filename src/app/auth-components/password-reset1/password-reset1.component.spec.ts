import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordReset1Component } from './password-reset1.component';

describe('PasswordReset1Component', () => {
  let component: PasswordReset1Component;
  let fixture: ComponentFixture<PasswordReset1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordReset1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordReset1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
