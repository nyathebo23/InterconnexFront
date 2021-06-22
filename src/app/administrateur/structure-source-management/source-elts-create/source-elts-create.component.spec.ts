import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceEltsCreateComponent } from './source-elts-create.component';

describe('SourceEltsCreateComponent', () => {
  let component: SourceEltsCreateComponent;
  let fixture: ComponentFixture<SourceEltsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SourceEltsCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceEltsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
