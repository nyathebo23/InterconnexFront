import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DDIAProcessedContainerComponent } from './ddia-processed-container.component';

describe('DDIAProcessedContainerComponent', () => {
  let component: DDIAProcessedContainerComponent;
  let fixture: ComponentFixture<DDIAProcessedContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DDIAProcessedContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DDIAProcessedContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
