import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DDIAReceivedContainerComponent } from './ddia-received-container.component';

describe('DDIAReceivedContainerComponent', () => {
  let component: DDIAReceivedContainerComponent;
  let fixture: ComponentFixture<DDIAReceivedContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DDIAReceivedContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DDIAReceivedContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
