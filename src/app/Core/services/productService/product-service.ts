import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) { }
  getAllProducts(): Observable<any> {
    return this._http.get('https://ecommerce.routemisr.com/api/v1/products'); 
  }
  getProductDetails(id: string): Observable<any> {
    return this._http.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
}