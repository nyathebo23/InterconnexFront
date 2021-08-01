import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDDIAReceivedComponent } from './list-ddia-received.component';

describe('ListDDIAReceivedComponent', () => {
  let component: ListDDIAReceivedComponent;
  let fixture: ComponentFixture<ListDDIAReceivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDDIAReceivedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDDIAReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
