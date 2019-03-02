import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminItemManagerComponent} from './admin-item-manager.component';

describe('AdminItemManagerComponent', () => {
  let component: AdminItemManagerComponent;
  let fixture: ComponentFixture<AdminItemManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminItemManagerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminItemManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
