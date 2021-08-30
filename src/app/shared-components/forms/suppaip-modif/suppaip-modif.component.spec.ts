import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SUPPAIPModifComponent } from './suppaip-modif.component';

describe('SUPPAIPModifComponent', () => {
  let component: SUPPAIPModifComponent;
  let fixture: ComponentFixture<SUPPAIPModifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SUPPAIPModifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SUPPAIPModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
