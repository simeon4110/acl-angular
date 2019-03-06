import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditPoemFormComponent} from './edit-poem-form.component';

describe('EditPoemFormComponent', () => {
  let component: EditPoemFormComponent;
  let fixture: ComponentFixture<EditPoemFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditPoemFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPoemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
