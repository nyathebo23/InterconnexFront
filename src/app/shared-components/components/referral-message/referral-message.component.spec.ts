import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralMessageComponent } from './referral-message.component';

describe('ReferralMessageComponent', () => {
  let component: ReferralMessageComponent;
  let fixture: ComponentFixture<ReferralMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferralMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
