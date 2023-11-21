import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Librarian } from 'src/app/models/librarian';
import { LibrarianService } from 'src/app/services/librarian.service';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-add-edit-librarian',
  templateUrl: './add-edit-librarian.component.html',
  styleUrls: ['./add-edit-librarian.component.css']
})
export class AddEditLibrarianComponent implements OnInit{

  librarianForm!: FormGroup;
  model = {} as Librarian;
  pageHeader: string = '';
  submitBtn: string = '';
  id : any;
  constructor(private librarianService: LibrarianService,
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
      this.pageHeader = 'Edit Librarian';
      this.submitBtn = 'Update';
      this.getLibrarianData(this.id);
    }
    else{
      this.pageHeader = 'Add Librarian';
      this.submitBtn = 'Add';
    }   
  }

  initializeForm(){
    this.librarianForm = this.fb.group({
      firstName : ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      librarianId: ['', Validators.required],
      street: [''],
      zipCode: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
    });
  }

  get firstName() {
    return this.librarianForm.get('firstName');
  } 

  get lastName() {
    return this.librarianForm.get('lastName');
  } 

  get librarianId() {
    return this.librarianForm.get('librarianId');
  } 

  get zipCode() {
    return this.librarianForm.get('zipCode');
  } 

  get city() {
    return this.librarianForm.get('city');
  } 

  get state() {
    return this.librarianForm.get('state');
  } 


  submit(){
    if(this.librarianForm.valid){
      if(this.id){
        this.librarianService.updateLibrarian(this.id, this.model).subscribe(data =>{
          console.log('Librarian updated successfully!');
          this.toastrService.success('Librarian updated successfully!');
          this.router.navigateByUrl('/librarian/librarian-list');
        },(err) =>{
          console.log(err);
          
        });
      }
      else{
        this.librarianService.addLibrarian(this.model).subscribe(()=>{
          console.log('Librarian added successfully!');
          this.toastrService.success('Librarian added successfully!');
          this.router.navigateByUrl('/librarian/librarian-list');
          
        },(err) => {
          console.log(err);
          
        });
      }
    }
  }

  cancel(){
    this.location.back();
  }

  getLibrarianData(id: any){
    this.librarianService.getLibrarian(id).subscribe(data=>{
      this.model = data;
    });
  }
}
