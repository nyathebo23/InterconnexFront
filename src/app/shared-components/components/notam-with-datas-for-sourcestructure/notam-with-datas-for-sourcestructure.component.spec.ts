import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NOTAMWithDatasForSourcestructureComponent } from './notam-with-datas-for-sourcestructure.component';

describe('NOTAMWithDatasForSourcestructureComponent', () => {
  let component: NOTAMWithDatasForSourcestructureComponent;
  let fixture: ComponentFixture<NOTAMWithDatasForSourcestructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NOTAMWithDatasForSourcestructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NOTAMWithDatasForSourcestructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
