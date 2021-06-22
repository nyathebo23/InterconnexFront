import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DDIAItemComponent } from './ddia-item.component';

describe('DDIAItemComponent', () => {
  let component: DDIAItemComponent;
  let fixture: ComponentFixture<DDIAItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DDIAItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DDIAItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
