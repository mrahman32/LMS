import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibrarianRoutingModule } from './librarian-routing.module';
import { AddEditLibrarianComponent } from './add-edit-librarian/add-edit-librarian.component';
import { LibrarianListComponent } from './librarian-list/librarian-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddEditLibrarianComponent,
    LibrarianListComponent
  ],
  imports: [
    CommonModule,
    LibrarianRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class LibrarianModule { }
