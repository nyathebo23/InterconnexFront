import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfLocauxNationauxManageComponent } from './inf-locaux-nationaux-manage.component';

describe('InfLocauxNationauxManageComponent', () => {
  let component: InfLocauxNationauxManageComponent;
  let fixture: ComponentFixture<InfLocauxNationauxManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfLocauxNationauxManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfLocauxNationauxManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
