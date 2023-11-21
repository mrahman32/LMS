import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditStudentComponent } from './add-edit-student/add-edit-student.component';
import { StudentListComponent } from './student-list/student-list.component';

const routes: Routes = [
  {
    path: 'add-student', component: AddEditStudentComponent
  },
  {
    path: 'student-list', component: StudentListComponent
  },
  {
    path: 'edit-student/:id', component: AddEditStudentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
