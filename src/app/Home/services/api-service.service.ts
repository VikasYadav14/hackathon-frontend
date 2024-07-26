import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
userdetails:any
  constructor(
    private http: HttpClient
  ) { }
  // baseurl = 'http://localhost:3000'
  baseurl = 'https://hackathon-backend-vikasyadav14s-projects.vercel.app'
  login(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseurl}/api/signIn`, payload);
  }

  uploadUserData(payload: any) {
    // debugger;
    return this.http.post<any>(`${this.baseurl}/api/employeDetails`, payload);
  }
}
