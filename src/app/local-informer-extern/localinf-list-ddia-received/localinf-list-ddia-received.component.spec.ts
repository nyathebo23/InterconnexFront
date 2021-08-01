import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalinfListDDIAReceivedComponent } from './localinf-list-ddia-received.component';

describe('LocalinfListDDIAReceivedComponent', () => {
  let component: LocalinfListDDIAReceivedComponent;
  let fixture: ComponentFixture<LocalinfListDDIAReceivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalinfListDDIAReceivedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalinfListDDIAReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
