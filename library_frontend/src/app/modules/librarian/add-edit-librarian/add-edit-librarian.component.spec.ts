import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLibrarianComponent } from './add-edit-librarian.component';

describe('AddEditLibrarianComponent', () => {
  let component: AddEditLibrarianComponent;
  let fixture: ComponentFixture<AddEditLibrarianComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditLibrarianComponent]
    });
    fixture = TestBed.createComponent(AddEditLibrarianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
