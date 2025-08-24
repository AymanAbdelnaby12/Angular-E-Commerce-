import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home-slider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './home-slider.html',
  styleUrls: ['./home-slider.css']
})
export class HomeSlider {
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
