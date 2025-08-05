import { Observable } from 'rxjs';
import { Ilogin } from '../../Shared/Interfaces/ilogin';
import { IRegister } from '../../Shared/Interfaces/iregister';
import { Login } from './../../Features/auth/login/login';
import { Register } from './../../Features/auth/register/register';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
}) 
export class AuthService {

  constructor(private _http: HttpClient) { }
  Register(FormData:IRegister):Observable<any> {
    return this._http.post('https://ecommerce.routemisr.com/api/v1/auth/signup', FormData);
  }
  Login(FormData:Ilogin):Observable<any> {
    return this._http.post('https://ecommerce.routemisr.com/api/v1/auth/signin', FormData);
  }
}
