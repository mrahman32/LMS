import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ZipCodeModel } from 'src/app/models/zipCodeModel';

@Component({
  selector: 'app-add-edit-student',
  templateUrl: './add-edit-student.component.html',
  styleUrls: ['./add-edit-student.component.css']
})
export class AddEditStudentComponent implements OnInit{

  studentForm!: FormGroup;
  model = {} as Student;
  zipModel = {} as ZipCodeModel;
  pageHeader: string = '';
  submitBtn: string = '';
  id : any;
  constructor(private studentService: StudentService,
    private fb : FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private location: Location){

  }

  ngOnInit(): void {
    this.initializeForm();

    this.id = this.activateRoute.snapshot.paramMap.get('id'); 

    if(this.id){
      this.pageHeader = 'Edit Student';
      this.submitBtn = 'Update';
      this.getStudentData(this.id);
    }
    else{
      this.pageHeader = 'Add Student';
      this.submitBtn = 'Add';
    }   
  }

  initializeForm(){
    this.studentForm = this.fb.group({
      firstName : ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      studentId: ['', Validators.required],
      street: [''],
      zipCode: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
    });
  }

  get firstName() {
    return this.studentForm.get('firstName');
  } 

  get lastName() {
    return this.studentForm.get('lastName');
  } 

  get studentId() {
    return this.studentForm.get('studentId');
  } 

  get zipCode() {
    return this.studentForm.get('zipCode');
  } 

  get city() {
    return this.studentForm.get('city');
  } 

  get state() {
    return this.studentForm.get('state');
  } 


  submit(){
    if(this.studentForm.valid){
      if(this.id){
        this.studentService.updateStudent(this.id, this.model).subscribe(data =>{
          console.log('Student updated successfully!');
          this.toastrService.success('Student updated successfully!');
          this.router.navigateByUrl('/student/student-list');
        },(err) =>{
          console.log(err);
          
        });
      }
      else{
        this.studentService.addStudent(this.model).subscribe(()=>{
          console.log('Student added successfully!');
          this.toastrService.success('Student added successfully!');
          this.router.navigateByUrl('/student/student-list');
          
        },(err) => {
          console.log(err);
          
        });
      }
    }
  }

  cancel(){
    this.location.back();
  }

  getStudentData(id: any){
    this.studentService.getStudent(id).subscribe(data=>{
      this.model = data;
    });
  }

  onZipChange(){
    const zipCode = this.model.zipCode;
    console.log(zipCode);
    this.studentService.getZipCodeInfo(zipCode).subscribe(data=>{
      this.model.zipCode = data.zipCode;
      this.model.city = data.city;
      this.model.state = data.state;
    })
  }
}
