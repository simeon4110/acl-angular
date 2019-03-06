import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditSectionFormComponent} from './edit-section-form.component';

describe('EditSectionFormComponent', () => {
  let component: EditSectionFormComponent;
  let fixture: ComponentFixture<EditSectionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditSectionFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
