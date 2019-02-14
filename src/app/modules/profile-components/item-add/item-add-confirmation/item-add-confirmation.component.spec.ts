import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemAddConfirmationComponent} from './item-add-confirmation.component';

describe('ItemAddConfirmationComponent', () => {
  let component: ItemAddConfirmationComponent;
  let fixture: ComponentFixture<ItemAddConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemAddConfirmationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemAddConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
