import { Component, NgModule, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../../../Core/services/productService/product-service';
import { Iproducts } from '../../../Shared/Interfaces/iproducts';
import { ShortTitlePipe } from '../../../Shared/pipe/short-title-pipe';
import { CurrencyPipe } from '@angular/common';
import { SearchingPipe } from '../../../Shared/pipe/searching-pipe';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { CartService } from '../../../Core/services/Cart/cart-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  imports: [ShortTitlePipe,CurrencyPipe,SearchingPipe,FormsModule,RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {
  
  searchTerm: string = '';
  productsList: Iproducts[] = [];
  isLoading: boolean = true;

  constructor(
    private products: ProductService,
    private router: Router,
    private cdr: ChangeDetectorRef , // to handle change detection
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.isLoading = true;
    this.products.getAllProducts().subscribe({
      next: (response) => {
        console.log(response.data);
        this.productsList = response.data;
        this.isLoading = false;
        this.cdr.detectChanges(); 
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.isLoading = false;
      }
    });
  }
addToCart(productId: string) {
  this.toastr.info('Adding product to cart...', 'Please wait',{
    closeButton: true,  
    positionClass: 'toast-top-left',
    timeOut: 1000
  });
  
  this.cartService.addToCart(productId).subscribe({
    next: (response) => {
      this.cartService.cartNumber.next(response.numOfCartItem); 
      this.toastr.clear(); 
      this.toastr.success(response.message, 'Success',{
        closeButton: true, 
        positionClass: 'toast-top-left',
        timeOut: 2000
      });
    },
    error: (error) => {
      this.toastr.clear();
      this.toastr.error('Failed to add product', 'Error');
    }
  });
}
}