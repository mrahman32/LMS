import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  bookList : any = [];
  constructor(private bookService: BookService,
              private router: Router,
              private toastrService: ToastrService){

  }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(){
    this.bookService.getBooks().subscribe(data=>{
      this.bookList = data;
    })
  }

  addBook(){
    this.router.navigateByUrl('/book/add-book');
  }

  editBook(id: any){
    this.router.navigateByUrl(`/book/edit-book/${id}`);
  }

  deleteBook(id: any, i: any){
    if(window.confirm('Are you sure want to delete this book?')){
      this.bookService.deleteBook(id).subscribe(data=>{
        this.toastrService.error('Book deleted successfully!');
        this.getBooks();
      })
    }
  }
}
