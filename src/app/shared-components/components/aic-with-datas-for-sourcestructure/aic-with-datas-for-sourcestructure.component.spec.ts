import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AicWithDatasForSourcestructureComponent } from './aic-with-datas-for-sourcestructure.component';

describe('AicWithDatasForSourcestructureComponent', () => {
  let component: AicWithDatasForSourcestructureComponent;
  let fixture: ComponentFixture<AicWithDatasForSourcestructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AicWithDatasForSourcestructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AicWithDatasForSourcestructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
