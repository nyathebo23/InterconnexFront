import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackToPrecPageComponent } from './back-to-prec-page.component';

describe('BackToPrecPageComponent', () => {
  let component: BackToPrecPageComponent;
  let fixture: ComponentFixture<BackToPrecPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackToPrecPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackToPrecPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
