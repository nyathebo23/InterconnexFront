import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeResendComponent } from './code-resend.component';

describe('CodeResendComponent', () => {
  let component: CodeResendComponent;
  let fixture: ComponentFixture<CodeResendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeResendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeResendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
