import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditLibrarianComponent } from './add-edit-librarian/add-edit-librarian.component';
import { LibrarianListComponent } from './librarian-list/librarian-list.component';

const routes: Routes = [
  {
    path: 'add-librarian', component: AddEditLibrarianComponent
  },
  {
    path: 'librarian-list', component: LibrarianListComponent
  },
  {
    path: 'edit-librarian/:id', component: AddEditLibrarianComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibrarianRoutingModule { }
