import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceUnitFormComponent } from './source-unit-form.component';

describe('SourceUnitFormComponent', () => {
  let component: SourceUnitFormComponent;
  let fixture: ComponentFixture<SourceUnitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SourceUnitFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceUnitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
