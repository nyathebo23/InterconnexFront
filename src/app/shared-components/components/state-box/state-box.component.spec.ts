import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateBoxComponent } from './state-box.component';

describe('StateBoxComponent', () => {
  let component: StateBoxComponent;
  let fixture: ComponentFixture<StateBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
