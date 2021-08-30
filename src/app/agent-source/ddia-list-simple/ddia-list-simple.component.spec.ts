import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DDIAListSimpleComponent } from './ddia-list-simple.component';

describe('DDIAListSimpleComponent', () => {
  let component: DDIAListSimpleComponent;
  let fixture: ComponentFixture<DDIAListSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DDIAListSimpleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DDIAListSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
