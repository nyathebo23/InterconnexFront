import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AICComponent } from './aic.component';

describe('AICComponent', () => {
  let component: AICComponent;
  let fixture: ComponentFixture<AICComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AICComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AICComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
