import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAerodromesComponent } from './list-aerodromes.component';

describe('ListAerodromesComponent', () => {
  let component: ListAerodromesComponent;
  let fixture: ComponentFixture<ListAerodromesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAerodromesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAerodromesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
