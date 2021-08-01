import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStatesBoxComponent } from './list-states-box.component';

describe('ListStatesBoxComponent', () => {
  let component: ListStatesBoxComponent;
  let fixture: ComponentFixture<ListStatesBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListStatesBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStatesBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
