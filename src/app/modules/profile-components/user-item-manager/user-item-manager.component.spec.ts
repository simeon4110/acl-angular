import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserItemManagerComponent} from './user-item-manager.component';

describe('UserItemManagerComponent', () => {
  let component: UserItemManagerComponent;
  let fixture: ComponentFixture<UserItemManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserItemManagerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserItemManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
