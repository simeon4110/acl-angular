import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CardPoemComponent} from './card-poem.component';

describe('CardPoemComponent', () => {
  let component: CardPoemComponent;
  let fixture: ComponentFixture<CardPoemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardPoemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPoemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
