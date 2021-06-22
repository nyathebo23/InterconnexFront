import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DDIAListComponent } from './ddia-list.component';

describe('DDIAListComponent', () => {
  let component: DDIAListComponent;
  let fixture: ComponentFixture<DDIAListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DDIAListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DDIAListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
