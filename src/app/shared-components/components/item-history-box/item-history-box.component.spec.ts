import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemHistoryBoxComponent } from './item-history-box.component';

describe('ItemHistoryBoxComponent', () => {
  let component: ItemHistoryBoxComponent;
  let fixture: ComponentFixture<ItemHistoryBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemHistoryBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemHistoryBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
