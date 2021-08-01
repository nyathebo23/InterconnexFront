import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DDIAPresentComponent } from './ddia-present.component';

describe('DDIAPresentComponent', () => {
  let component: DDIAPresentComponent;
  let fixture: ComponentFixture<DDIAPresentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DDIAPresentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DDIAPresentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
