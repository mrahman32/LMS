import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home/home.component';

const routes: Routes = [
  {
    path : '', component: HomeComponent
  },
  {
    path : 'home', loadChildren: ()=> import('./modules/home/home.module').then(mode => mode.HomeModule)
  },
  {
    path : 'book', loadChildren: ()=> import('./modules/book/book.module').then(mode => mode.BookModule)
  },
  {
    path : 'book', loadChildren: ()=> import('./modules/book/book.module').then(mode => mode.BookModule)
  },
  {
    path : 'student', loadChildren: ()=> import('./modules/student/student.module').then(mode => mode.StudentModule)
  },
  {
    path : 'librarian', loadChildren: ()=> import('./modules/librarian/librarian.module').then(mode => mode.LibrarianModule)
  },
  {
    path : 'book-reservation', loadChildren: ()=> import('./modules/book-reservation/book-reservation.module').then(mode => mode.BookReservationModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
