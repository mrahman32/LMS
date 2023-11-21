import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  //Nodejs API string
  REST_API : string = 'http://localhost:8000/api-book';

  //Set http headers for CORS issue
  httpHeaders = new HttpHeaders().set('Content-type', 'application/json');

  constructor(private httpClient : HttpClient) { }

  addBook(data: Book):Observable<any>{
    console.log(data);
    let API_URL = `${this.REST_API}/add-book`;
    return this.httpClient.post(API_URL,data).pipe(catchError(this.handleError))
  }

  getBooks(){
    return this.httpClient.get(`${this.REST_API}`);
  }

  getBook(id : any): Observable<any>{
    let API_URL = `${this.REST_API}/read-book/${id}`;
    return this.httpClient.get(API_URL, {headers: this.httpHeaders}).pipe(map((res: any)=>{
      return res || {}
    }),
    catchError(this.handleError))
    
  }

  updateBook(id: any, data: any): Observable<any>{
    let API_URL = `${this.REST_API}/update-book/${id}`;

    return this.httpClient.put(API_URL, data, {headers: this.httpHeaders}).pipe(
      catchError(this.handleError)
    )
  }

  deleteBook(id: any): Observable<any>{
    let API_URL = `${this.REST_API}/delete-book/${id}`;

    return this.httpClient.delete(API_URL, {headers: this.httpHeaders}).pipe(
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      //handle client error
      errorMessage = error.error.message;
    }
    else{
      //handle server side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
    
  }
  
}
