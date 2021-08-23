import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DDIAActionItemComponent } from './ddia-action-item.component';

describe('DDIAActionItemComponent', () => {
  let component: DDIAActionItemComponent;
  let fixture: ComponentFixture<DDIAActionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DDIAActionItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DDIAActionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
