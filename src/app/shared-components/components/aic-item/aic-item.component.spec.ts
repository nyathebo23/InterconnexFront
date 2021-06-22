import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AICItemComponent } from './aic-item.component';

describe('AICItemComponent', () => {
  let component: AICItemComponent;
  let fixture: ComponentFixture<AICItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AICItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AICItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
