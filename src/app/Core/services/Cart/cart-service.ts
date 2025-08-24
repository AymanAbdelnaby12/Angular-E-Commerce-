import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../constant/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class CartService { 
  cartNumber: BehaviorSubject<number> = new BehaviorSubject<number>(0); 

  constructor(private http: HttpClient) {   
    this.loadCartCount();
  }

  private loadCartCount() {
    this.getCart().subscribe({
      next: (res) => {
        this.cartNumber.next(res.numOfCartItems);
        console.log("Cart number initialized:", res.numOfCartItems);
      }
    });
  }

  addToCart(productId: string): Observable<any> {
    return this.http.post(`${baseUrl.baseUrl}/cart`, { productId });
  }

  getCart(): Observable<any> {
    return this.http.get(`${baseUrl.baseUrl}/cart`);
  }

  updateCart(productId: string, count: number): Observable<any> {
    return this.http.put(`${baseUrl.baseUrl}/cart/${productId}`, { count });
  }

  deleteCartItem(productId: string): Observable<any> {
    return this.http.delete(`${baseUrl.baseUrl}/cart/${productId}`);
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${baseUrl.baseUrl}/cart`);
  }

  Checkout(cartId: any, payload: any): Observable<any> {
    return this.http.post(`${baseUrl.baseUrl}/orders/checkout-session/${cartId}?url=http://localhost:4200`, {
      shippingAddress: payload
    });
  }
}
