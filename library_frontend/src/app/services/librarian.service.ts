import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Librarian } from '../models/librarian';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibrarianService {
  //Nodejs API string
    REST_API : string = 'http://localhost:8000/api-librarian';

    //Set http headers for CORS issue
    httpHeaders = new HttpHeaders().set('Content-type', 'application/json');
  
    constructor(private httpClient : HttpClient) { }
  
    addLibrarian(data: Librarian):Observable<any>{
      let API_URL = `${this.REST_API}/add-librarian`;
      return this.httpClient.post(API_URL,data).pipe(catchError(this.handleError))
    }
  
    getLibrarians(){
      return this.httpClient.get(`${this.REST_API}`);
    }
  
    getLibrarian(id : any): Observable<any>{
      let API_URL = `${this.REST_API}/read-librarian/${id}`;
      return this.httpClient.get(API_URL, {headers: this.httpHeaders}).pipe(map((res: any)=>{
        return res || {}
      }),
      catchError(this.handleError))
      
    }
  
    updateLibrarian(id: any, data: any): Observable<any>{
      let API_URL = `${this.REST_API}/update-librarian/${id}`;
  
      return this.httpClient.put(API_URL, data, {headers: this.httpHeaders}).pipe(
        catchError(this.handleError)
      )
    }
  
    deleteLibrarian(id: any): Observable<any>{
      let API_URL = `${this.REST_API}/delete-librarian/${id}`;
  
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
