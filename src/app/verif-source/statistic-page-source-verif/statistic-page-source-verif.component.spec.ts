import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticPageSourceVerifComponent } from './statistic-page-source-verif.component';

describe('StatisticPageSourceVerifComponent', () => {
  let component: StatisticPageSourceVerifComponent;
  let fixture: ComponentFixture<StatisticPageSourceVerifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticPageSourceVerifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticPageSourceVerifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
