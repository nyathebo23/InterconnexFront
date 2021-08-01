import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseSourceStructureComponent } from './base-source-structure.component';

describe('BaseSourceStructureComponent', () => {
  let component: BaseSourceStructureComponent;
  let fixture: ComponentFixture<BaseSourceStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseSourceStructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseSourceStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
