import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-add-edit-book',
  templateUrl: './add-edit-book.component.html',
  styleUrls: ['./add-edit-book.component.css']
})
export class AddEditBookComponent implements OnInit{

  bookForm!: FormGroup;
  model = {} as Book;

  amount: number;
  cardName: string;
  cvv:string

  pageHeader: string = '';
  submitBtn: string = '';
  id : any;

  constructor(private bookService: BookService,
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
      this.pageHeader = 'Edit Book';
      this.submitBtn = 'Update';
      this.getBookData(this.id);
    }
    else{
      this.pageHeader = 'Add Book';
      this.submitBtn = 'Add';
    }   
  }

  initializeForm(){
    this.bookForm = this.fb.group({
      name : ['', Validators.required],
      author: ['', Validators.required],
      description: [''],
      price: ['', Validators.required],
      isbn:['', Validators.required],
      quantity:['', Validators.required],
      reservedQty:[''],
    });
  }

  get name() {
    return this.bookForm.get('name');
  } 

  get author() {
    return this.bookForm.get('author');
  } 

  get price() {
    return this.bookForm.get('price');
  } 

  get isbn() {
    return this.bookForm.get('isbn');
  } 

  get quantity() {
    return this.bookForm.get('quantity');
  } 


  submit(){
    if(this.bookForm.valid){
      if(this.id){
        console.log(this.amount);
        console.log(this.cardName);
        
        this.bookService.updateBook(this.id, this.model).subscribe(data =>{
          console.log('Book updated successfully!');
          this.toastrService.success('Book updated successfully!');
          this.router.navigateByUrl('/book/book-list');
        },(err) =>{
          console.log(err);
          
        });
      }
      else{
        this.model.reservedQty = 0;
        this.bookService.addBook(this.model).subscribe(()=>{
          console.log('Book added successfully!');
          this.toastrService.success('Book added successfully!');
          this.router.navigateByUrl('/book/book-list');
          
        },(err) => {
          console.log(err);
          
        });
      }
    }
  }

  cancel(){
    this.location.back();
  }

  getBookData(id: any){
    this.bookService.getBook(id).subscribe(data=>{
      this.model = data;
      this.model.price = data.price.$numberDecimal;
    });
  }

}
