import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AICWithDataComponent } from './aic-with-data.component';

describe('AICWithDataComponent', () => {
  let component: AICWithDataComponent;
  let fixture: ComponentFixture<AICWithDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AICWithDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AICWithDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
