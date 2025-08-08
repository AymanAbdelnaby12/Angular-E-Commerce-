import { Observable, BehaviorSubject } from 'rxjs';
import { Ilogin } from '../../../Shared/Interfaces/ilogin';
import { IRegister } from '../../../Shared/Interfaces/iregister';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData = new BehaviorSubject<any | null>(null); //to update user data across the application

  constructor(private _http: HttpClient) { }

  Register(FormData: IRegister): Observable<any> {
    return this._http.post('https://ecommerce.routemisr.com/api/v1/auth/signup', FormData);
  }

  Login(FormData: Ilogin): Observable<any> {
    return this._http.post('https://ecommerce.routemisr.com/api/v1/auth/signin', FormData);
  }
 
decodeUserData() {
    const token = localStorage.getItem('userToken');
    if (token) {
      const decodeduserData = jwtDecode(token);
      this.userData.next(decodeduserData);  // Update the BehaviorSubject with the decoded user data
    } else {
      this.userData.next(null);
    }
  }

  logOut() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
  }

 
}
