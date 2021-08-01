import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifSourceListDDIAReceivedComponent } from './verif-source-list-ddia-received.component';

describe('VerifSourceListDDIAReceivedComponent', () => {
  let component: VerifSourceListDDIAReceivedComponent;
  let fixture: ComponentFixture<VerifSourceListDDIAReceivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifSourceListDDIAReceivedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifSourceListDDIAReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
