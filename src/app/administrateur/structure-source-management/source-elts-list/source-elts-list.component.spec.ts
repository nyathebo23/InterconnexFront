import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceEltsListComponent } from './source-elts-list.component';

describe('SourceEltsListComponent', () => {
  let component: SourceEltsListComponent;
  let fixture: ComponentFixture<SourceEltsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SourceEltsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceEltsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
