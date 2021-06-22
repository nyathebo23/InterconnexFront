import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructSourceManageComponent } from './struct-source-manage.component';

describe('StructSourceManageComponent', () => {
  let component: StructSourceManageComponent;
  let fixture: ComponentFixture<StructSourceManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructSourceManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructSourceManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
