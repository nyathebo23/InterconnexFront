import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SUPPAIPItemComponent } from './suppaip-item.component';

describe('SUPPAIPItemComponent', () => {
  let component: SUPPAIPItemComponent;
  let fixture: ComponentFixture<SUPPAIPItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SUPPAIPItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SUPPAIPItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
