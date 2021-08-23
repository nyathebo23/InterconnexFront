import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SUPPAIPWithDatasForSourcestructureComponent } from './suppaip-with-datas-for-sourcestructure.component';

describe('SUPPAIPWithDatasForSourcestructureComponent', () => {
  let component: SUPPAIPWithDatasForSourcestructureComponent;
  let fixture: ComponentFixture<SUPPAIPWithDatasForSourcestructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SUPPAIPWithDatasForSourcestructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SUPPAIPWithDatasForSourcestructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
