import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookReservation } from '../models/bookReservation';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookReservationService {

  //Nodejs API string
  REST_API : string = 'http://localhost:8000/api-book-reservation';

  //Set http headers for CORS issue
  httpHeaders = new HttpHeaders().set('Content-type', 'application/json');

  constructor(private httpClient : HttpClient) { }

  addReservation(data: BookReservation):Observable<any>{
    let API_URL = `${this.REST_API}/add-book-reservation`;
    return this.httpClient.post(API_URL,data).pipe(catchError(this.handleError));
  }

  getReservations(){
    return this.httpClient.get(`${this.REST_API}`);
  }

  getReservation(id : any): Observable<any>{
    let API_URL = `${this.REST_API}/read-book-reservation/${id}`;
    return this.httpClient.get(API_URL, {headers: this.httpHeaders}).pipe(map((res: any)=>{
      return res || {}
    }),
    catchError(this.handleError))
    
  }

  updateReservation(id: any, data: any): Observable<any>{
    let API_URL = `${this.REST_API}/update-reservation/${id}`;

    return this.httpClient.put(API_URL, data, {headers: this.httpHeaders}).pipe(
      catchError(this.handleError)
    )
  }

  completeReservation(data: BookReservation):Observable<any>{
    let API_URL = `${this.REST_API}/complete-book-reservation`;
    return this.httpClient.post(API_URL,data).pipe(catchError(this.handleError));
  }

  deleteReservation(id: any): Observable<any>{
    let API_URL = `${this.REST_API}/delete-reservation/${id}`;

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
