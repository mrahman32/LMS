import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditBookComponent } from './add-edit-book/add-edit-book.component';
import { BookListComponent } from './book-list/book-list.component';

const routes: Routes = [
  {
    path: 'add-book', component: AddEditBookComponent
  },
  {
    path: 'book-list', component: BookListComponent
  },
  {
    path: 'edit-book/:id', component: AddEditBookComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
