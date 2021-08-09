import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DDIAProcessedBaseContainerComponent } from './ddia-processed-base-container.component';

describe('DDIAProcessedBaseContainerComponent', () => {
  let component: DDIAProcessedBaseContainerComponent;
  let fixture: ComponentFixture<DDIAProcessedBaseContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DDIAProcessedBaseContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DDIAProcessedBaseContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
