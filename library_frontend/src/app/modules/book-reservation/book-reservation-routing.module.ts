import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditBookReservationComponent } from './add-edit-book-reservation/add-edit-book-reservation.component';
import { BookReservationListComponent } from './book-reservation-list/book-reservation-list.component';

const routes: Routes = [
  {
    path: 'add-book-reservation', component: AddEditBookReservationComponent
  },
  {
    path: 'book-reservation-list', component: BookReservationListComponent
  },
  {
    path: 'edit-book-reservation/:id', component: AddEditBookReservationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookReservationRoutingModule { }
