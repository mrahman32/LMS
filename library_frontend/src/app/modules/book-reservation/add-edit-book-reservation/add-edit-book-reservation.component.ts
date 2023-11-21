import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookReservation } from 'src/app/models/bookReservation';
import { BookReservationService } from 'src/app/services/book-reservation.service';
import { DatePipe, Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book';
import { StudentService } from 'src/app/services/student.service';
import { LibrarianService } from 'src/app/services/librarian.service';

@Component({
  selector: 'app-add-edit-book-reservation',
  templateUrl: './add-edit-book-reservation.component.html',
  styleUrls: ['./add-edit-book-reservation.component.css'],
  providers: [DatePipe] // Add DatePipe to providers
})
export class AddEditBookReservationComponent implements OnInit {

  bookReservationForm!: FormGroup;
  model = {} as BookReservation;
  pageHeader: string = '';
  submitBtn: string = '';
  id: any;
  booksDropdowns: any = [];
  studentDropdowns: any = [];
  librarianDropdowns: any = [];
  selectedBookId: any;
  availableBookCnt: number;
  toDate: any;
  submitBtnDisabled: boolean;
  fromDateString: string;
  toDateString: string;
  constructor(private bookReservationService: BookReservationService,
    private bookService: BookService,
    private studentService: StudentService,
    private librarianService: LibrarianService,
    private fb: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private location: Location,
    private datePipe: DatePipe) {

  }

  ngOnInit(): void {
    this.initializeForm();
    this.getBookDropDownList();
    this.getStudentDropDownList();
    this.getLibrarianDropDownList();

    this.id = this.activateRoute.snapshot.paramMap.get('id');

    if (this.id) {
      this.pageHeader = 'Edit Book Reservation';
      this.submitBtn = 'Update';
      this.getBookReservationData(this.id);
    }
    else {
      this.pageHeader = 'Add Book Reservation';
      this.submitBtn = 'Add';
    }
  }


  initializeForm() {
    this.bookReservationForm = this.fb.group({
      bookId: ['', Validators.required],
      bookCnt: [null],
      studentId: ['', Validators.required],
      librarianId: [''],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      isComplete: [null],
    });
  }

  onBookSelect() {
    if (this.model.bookId) {
      let book = this.booksDropdowns.find(x => x._id == this.model.bookId);
      this.availableBookCnt = book.quantity - book.reservedQty;
      this.bookReservationForm.get('bookCnt').disable();
      if(this.availableBookCnt <= 0){
        this.submitBtnDisabled = true;
      }
      else{
        this.submitBtnDisabled = false;
      }
    }
  }

  getBookDropDownList() {
    this.bookService.getBooks().subscribe(data => {
      this.booksDropdowns = data;
    });
  }

  getStudentDropDownList() {
    this.studentService.getStudents().subscribe(data => {
      this.studentDropdowns = data;
    })
  }

  getLibrarianDropDownList() {
    this.librarianService.getLibrarians().subscribe(data => {
      this.librarianDropdowns = data;
    })
  }

  get name() {
    return this.bookReservationForm.get('name');
  }


  submit() {
    if (this.bookReservationForm.valid) {
      this.model.fromDate = new Date(this.fromDateString);
      this.model.toDate = new Date(this.toDateString);
      if (this.id) {
        this.bookReservationService.updateReservation(this.id, this.model).subscribe(data => {
          console.log('Book reservation updated successfully!');
          this.toastrService.success('Book reservation updated successfully!');
          this.router.navigateByUrl('/book-reservation/book-reservation-list');
        }, (err) => {
          console.log(err);

        });
      }
      else {
        this.bookReservationService.addReservation(this.model).subscribe(() => {
          console.log('Book reservation added successfully!');
          this.toastrService.success('Book reservation added successfully!');
          this.router.navigateByUrl('/book-reservation/book-reservation-list');

        }, (err) => {
          console.log(err);

        });
      }
    }
  }

  cancel() {
    this.location.back();
  }

  getBookReservationData(id: any) {
    this.bookReservationService.getReservation(id).subscribe(data => {
      this.model = data;
      let formatedFromDate = new Date(this.model.fromDate);
      let formatedToDate = new Date(this.model.toDate);
      this.fromDateString = this.datePipe.transform(formatedFromDate, 'yyyy-MM-dd');
      this.toDateString = this.datePipe.transform(formatedToDate, 'yyyy-MM-dd');
      //this.model.fromDate = fd;
    //console.log(formatedDate); 
    });
  }
}
