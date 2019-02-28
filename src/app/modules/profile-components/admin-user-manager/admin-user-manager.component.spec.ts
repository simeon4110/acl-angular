import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminUserManagerComponent} from './admin-user-manager.component';

describe('AdminUserManagerComponent', () => {
  let component: AdminUserManagerComponent;
  let fixture: ComponentFixture<AdminUserManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUserManagerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
