import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBookReservationComponent } from './add-edit-book-reservation.component';

describe('AddEditBookReservationComponent', () => {
  let component: AddEditBookReservationComponent;
  let fixture: ComponentFixture<AddEditBookReservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditBookReservationComponent]
    });
    fixture = TestBed.createComponent(AddEditBookReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
