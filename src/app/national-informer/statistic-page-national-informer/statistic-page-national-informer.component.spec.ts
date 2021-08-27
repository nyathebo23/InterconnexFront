import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticPageNationalInformerComponent } from './statistic-page-national-informer.component';

describe('StatisticPageNationalInformerComponent', () => {
  let component: StatisticPageNationalInformerComponent;
  let fixture: ComponentFixture<StatisticPageNationalInformerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticPageNationalInformerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticPageNationalInformerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
