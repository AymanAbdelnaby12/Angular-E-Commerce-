import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../Core/services/productService/product-service';
import { Iproducts } from '../../../Shared/Interfaces/iproducts';
import { CurrencyPipe, NgFor } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../Core/services/Cart/cart-service';
import { CarouselModule, OwlOptions } from "ngx-owl-carousel-o";

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe, CarouselModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails {
  productDetails: Iproducts | null = null;
  isLoading: boolean = true;
  constructor(
    private activatedRoute: ActivatedRoute, 
    private product: ProductService,
    private cdr: ChangeDetectorRef,  // to handle change detection
    private cartService: CartService,
    private toastr: ToastrService
  ) {
    activatedRoute.params.subscribe((res) => {
      console.log(res);
      this.getProductDetails(res['id']);
    });
  }

  ngOnInit() {
    this.getProductDetails(this.activatedRoute.snapshot.params['id']);
  }

  getProductDetails(id: string) {
    this.isLoading = true;
    this.product.getProductDetails(id).subscribe({
      next: (response) => {
        console.log(response.data);
        this.productDetails = response.data;
        this.isLoading = false;
        this.cdr.detectChanges(); // to ensure the view updates with the new data
      },
      error: (error) => {
        console.error('Error fetching product details:', error); 
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
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: false,
    nav: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: { items: 1 }
    }
  };
}