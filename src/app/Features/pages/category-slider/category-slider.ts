import { NgFor } from '@angular/common';
import { CategoryService } from '../../../Core/services/CategoryService/category-service';
import { ICategory } from '../../../Shared/Interfaces/category';
import { Categories } from './../categories/categories';
import { Component, OnInit } from '@angular/core'; 
import { CarouselModule, OwlOptions } from "ngx-owl-carousel-o";

@Component({
  selector: 'app-category-slider',
  imports: [NgFor, CarouselModule],
  templateUrl: './category-slider.html',
  styleUrl: './category-slider.css'
})
export class CategorySlider {

  constructor(private Categories:CategoryService){}
  categoryList:ICategory[]=[];

  ngOnInit():void{
    this.getAllCategories();
  }

  getAllCategories(){
    this.Categories.getAllCategories().subscribe({
      next:(res)=>{
        this.categoryList=res.data
      }
    })
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
      0: { items: 1 },
      400:{items:2},
      740:{items:3},
      940:{items:6}
    }, 
  };
}
