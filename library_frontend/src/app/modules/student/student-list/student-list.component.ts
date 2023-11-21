import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit{
  studentList : any = [];
  constructor(private studentService: StudentService,
              private router: Router,
              private toastrService: ToastrService){

  }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(){
    this.studentService.getStudents().subscribe(data=>{
      this.studentList = data;
    })
  }

  addStudent(){
    this.router.navigateByUrl('/student/add-student');
  }

  editStudent(id: any){
    this.router.navigateByUrl(`/student/edit-student/${id}`);
  }

  deleteStudent(id: any, i: any){
    if(window.confirm('Are you sure want to delete this student?')){
      this.studentService.deleteStudent(id).subscribe(data=>{
        this.toastrService.error('Student deleted successfully!');
        this.getStudents();
      })
    }
  }
}
