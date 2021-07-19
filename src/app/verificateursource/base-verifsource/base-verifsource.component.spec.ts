import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseVerifsourceComponent } from './base-verifsource.component';

describe('BaseVerifsourceComponent', () => {
  let component: BaseVerifsourceComponent;
  let fixture: ComponentFixture<BaseVerifsourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseVerifsourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseVerifsourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
