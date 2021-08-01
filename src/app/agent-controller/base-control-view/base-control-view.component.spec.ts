import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseControlViewComponent } from './base-control-view.component';

describe('BaseControlViewComponent', () => {
  let component: BaseControlViewComponent;
  let fixture: ComponentFixture<BaseControlViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseControlViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseControlViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
