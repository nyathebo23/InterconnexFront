import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateDDIAComponent } from './duplicate-ddia.component';

describe('DuplicateDDIAComponent', () => {
  let component: DuplicateDDIAComponent;
  let fixture: ComponentFixture<DuplicateDDIAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuplicateDDIAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicateDDIAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
