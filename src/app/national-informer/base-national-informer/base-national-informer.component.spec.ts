import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseNationalInformerComponent } from './base-national-informer.component';

describe('BaseNationalInformerComponent', () => {
  let component: BaseNationalInformerComponent;
  let fixture: ComponentFixture<BaseNationalInformerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseNationalInformerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseNationalInformerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
