import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseSourceComponent } from './base-source.component';

describe('BaseSourceComponent', () => {
  let component: BaseSourceComponent;
  let fixture: ComponentFixture<BaseSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
