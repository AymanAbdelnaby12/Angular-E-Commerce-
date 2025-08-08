import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../Core/services/productService/product-service';
import { Iproducts } from '../../../Shared/Interfaces/iproducts';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails {
  productDetails: Iproducts | null = null;
  isLoading: boolean = true;
  constructor(
    private activatedRoute: ActivatedRoute, 
    private product: ProductService,
    private cdr: ChangeDetectorRef  // to handle change detection
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
}