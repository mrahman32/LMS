import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  //Nodejs API string
  REST_API: string = 'http://localhost:8000/api-student';

  //Set http headers for CORS issue
  httpHeaders = new HttpHeaders().set('Content-type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  addStudent(data: Student): Observable<any> {
    let API_URL = `${this.REST_API}/add-student`;
    return this.httpClient.post(API_URL, data).pipe(catchError(this.handleError))
  }

  getStudents() {
    return this.httpClient.get(`${this.REST_API}`);
  }

  getStudent(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/read-student/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(map((res: any) => {
      return res || {}
    }),
      catchError(this.handleError))

  }

  getZipCodeInfo(zip: any): Observable<any> {

    let API_URL = `${this.REST_API}/get-zipinfo/${zip}`;
    let result:any = {};
    console.log('========before api call=================')
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(map((res: any) => {
      const resultVariable = res;
      result.zipCode = resultVariable.zip_code;
      result.city = resultVariable.city;
      result.state = resultVariable.state;

      console.log(result);
      console.log('After api call ==========================')
      console.log(resultVariable);
      return result || {};
    }),
      catchError(this.handleError))
  }

  updateStudent(id: any, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/update-student/${id}`;

    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    )
  }

  deleteStudent(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-student/${id}`;

    return this.httpClient.delete(API_URL, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      //handle client error
      errorMessage = error.error.message;
    }
    else {
      //handle server side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);

  }
}
