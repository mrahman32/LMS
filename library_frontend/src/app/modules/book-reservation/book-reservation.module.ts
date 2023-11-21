import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookReservationRoutingModule } from './book-reservation-routing.module';
import { AddEditBookReservationComponent } from './add-edit-book-reservation/add-edit-book-reservation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookReservationListComponent } from './book-reservation-list/book-reservation-list.component';

@NgModule({
  declarations: [
    AddEditBookReservationComponent,
    BookReservationListComponent
  ],
  imports: [
    CommonModule,
    BookReservationRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BookReservationModule { }
