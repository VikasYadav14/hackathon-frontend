import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(
    private http: HttpClient
  ) { }

  login(payload:any): Observable<any> {
    return this.http.post<any>('https://hackathon-backend-vikasyadav14s-projects.vercel.app/api/login', payload);
  }

  uploadUserData(payload:any){
    return this.http.post<any>('https://hackathon-backend-vikasyadav14s-projects.vercel.app/api/employeeDetails', payload);
  }
}
