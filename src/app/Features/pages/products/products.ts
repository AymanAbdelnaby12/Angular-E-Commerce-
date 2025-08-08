import { Component, NgModule, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../../../Core/services/productService/product-service';
import { Iproducts } from '../../../Shared/Interfaces/iproducts';
import { ShortTitlePipe } from '../../../Shared/pipe/short-title-pipe';
import { CurrencyPipe } from '@angular/common';
import { SearchingPipe } from '../../../Shared/pipe/searching-pipe';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink } from '@angular/router';

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
    private cdr: ChangeDetectorRef  // to handle change detection
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
        this.cdr.detectChanges(); // to ensure the view updates with the new data
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.isLoading = false;
      }
    });
  }
}