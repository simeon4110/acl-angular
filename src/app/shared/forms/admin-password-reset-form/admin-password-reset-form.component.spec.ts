import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminPasswordResetFormComponent} from './admin-password-reset-form.component';

describe('AdminPasswordResetFormComponent', () => {
  let component: AdminPasswordResetFormComponent;
  let fixture: ComponentFixture<AdminPasswordResetFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPasswordResetFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPasswordResetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
