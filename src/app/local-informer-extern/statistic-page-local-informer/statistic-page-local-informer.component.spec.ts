import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticPageLocalInformerComponent } from './statistic-page-local-informer.component';

describe('StatisticPageLocalInformerComponent', () => {
  let component: StatisticPageLocalInformerComponent;
  let fixture: ComponentFixture<StatisticPageLocalInformerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticPageLocalInformerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticPageLocalInformerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
