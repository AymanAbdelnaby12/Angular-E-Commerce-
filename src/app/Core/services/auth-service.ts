import { Observable } from 'rxjs';
import { Ilogin } from '../../Shared/Interfaces/ilogin';
import { IRegister } from '../../Shared/Interfaces/iregister'; 
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
}) 
export class AuthService {
  userData: any= null;
  constructor(private _http: HttpClient) { }
  Register(FormData:IRegister):Observable<any> {
    return this._http.post('https://ecommerce.routemisr.com/api/v1/auth/signup', FormData);
  }
  Login(FormData:Ilogin):Observable<any> {
    return this._http.post('https://ecommerce.routemisr.com/api/v1/auth/signin', FormData);
  }

  decodeUserData() {
    const token = localStorage.getItem('userToken');
    const decodeduserData = jwtDecode(token || '');
    this.userData = decodeduserData;
    console.log(this.userData); 
  }
}
