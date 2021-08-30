import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AICModifComponent } from './aic-modif.component';

describe('AICModifComponent', () => {
  let component: AICModifComponent;
  let fixture: ComponentFixture<AICModifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AICModifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AICModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
