import { baseUrl } from './../../constant/baseUrl';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../../../Shared/Interfaces/auth';

@Injectable({
  providedIn: 'root'
}) 

export class ResetPasswordService { 
  constructor(private http: HttpClient) { }

  verifyEmail(data:Auth): Observable<any> {
    return this.http.post(`${baseUrl.baseUrl}/auth/forgotPasswords`, data);
  } 
  
  verifyCode(data:Auth): Observable<any> {
    return this.http.post(`${baseUrl.baseUrl}/auth/verifyResetCode`, data);
  } 

  resetPassword(data:Auth): Observable<any> {
    return this.http.post(`${baseUrl.baseUrl}/auth/resetPassword`, data);
    }     
} 