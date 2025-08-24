import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CartService } from '../../../Core/services/Cart/cart-service';
import { ICartList } from '../../../Shared/Interfaces/icart-list';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart implements OnInit {
  totalPrice: number = 0;
  cartList: ICartList[] = [];
  loading: boolean = true;
  cartId!: string;

  constructor(
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getCartItems();
  }

  getCartItems() {
    this.loading = true;
    this.cartService.getCart().subscribe({
      next: (response) => {
        console.log('Cart items:', response);
        this.totalPrice = response.data.totalCartPrice;
        this.cartList = response.data.products;
        this.cartId = response.cartId; 
        this.cartService.cartNumber.next(response.numOfCartItem);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching cart items:', error);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  updateCart(productId: string, count: number) {
    if (count < 1) return;  
    this.cartService.updateCart(productId, count).subscribe({
      next: (response) => {
        this.totalPrice = response.data.totalCartPrice;
        this.cartList = response.data.products;
        this.cartService.cartNumber.next(response.numOfCartItem);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error updating cart:', error);
      }
    });
  }

  removeItem(productId: string) {
    this.cartService.deleteCartItem(productId).subscribe({
      next: (response) => {
        this.totalPrice = response.data.totalCartPrice;
        this.cartList = response.data.products;
        this.cartService.cartNumber.next(response.numOfCartItem);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error removing item:', error);
      }
    });
  }
  clearCart() {
    this.cartService.clearCart().subscribe({
      next: (response) => {
        this.totalPrice = 0;
        this.cartList = [];
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error clearing cart:', error);
      }
    });
  }
}