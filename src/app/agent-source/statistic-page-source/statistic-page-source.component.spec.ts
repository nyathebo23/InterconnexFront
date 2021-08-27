import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticPageSourceComponent } from './statistic-page-source.component';

describe('StatisticPageSourceComponent', () => {
  let component: StatisticPageSourceComponent;
  let fixture: ComponentFixture<StatisticPageSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticPageSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticPageSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
