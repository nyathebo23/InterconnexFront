import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadDataErrorComponent } from './load-data-error.component';

describe('LoadDataErrorComponent', () => {
  let component: LoadDataErrorComponent;
  let fixture: ComponentFixture<LoadDataErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadDataErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadDataErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
