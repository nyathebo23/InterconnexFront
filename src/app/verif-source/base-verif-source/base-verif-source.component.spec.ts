import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseVerifSourceComponent } from './base-verif-source.component';

describe('BaseVerifSourceComponent', () => {
  let component: BaseVerifSourceComponent;
  let fixture: ComponentFixture<BaseVerifSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseVerifSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseVerifSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
