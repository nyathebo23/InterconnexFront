import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticPageSourceStructureComponent } from './statistic-page-source-structure.component';

describe('StatisticPageSourceStructureComponent', () => {
  let component: StatisticPageSourceStructureComponent;
  let fixture: ComponentFixture<StatisticPageSourceStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticPageSourceStructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticPageSourceStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
