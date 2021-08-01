import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseLocalInformerComponent } from './base-local-informer.component';

describe('BaseLocalInformerComponent', () => {
  let component: BaseLocalInformerComponent;
  let fixture: ComponentFixture<BaseLocalInformerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseLocalInformerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseLocalInformerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
