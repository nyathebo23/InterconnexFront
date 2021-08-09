import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DDIAReceivedBaseContainerComponent } from './ddia-received-base-container.component';

describe('DDIAReceivedBaseContainerComponent', () => {
  let component: DDIAReceivedBaseContainerComponent;
  let fixture: ComponentFixture<DDIAReceivedBaseContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DDIAReceivedBaseContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DDIAReceivedBaseContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
