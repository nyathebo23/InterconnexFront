import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupVerifComponent } from './signup-verif.component';

describe('SignupVerifComponent', () => {
  let component: SignupVerifComponent;
  let fixture: ComponentFixture<SignupVerifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupVerifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupVerifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
