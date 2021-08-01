import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalinfListDDIAReceivedComponent } from './nationalinf-list-ddia-received.component';

describe('NationalinfListDDIAReceivedComponent', () => {
  let component: NationalinfListDDIAReceivedComponent;
  let fixture: ComponentFixture<NationalinfListDDIAReceivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NationalinfListDDIAReceivedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalinfListDDIAReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
