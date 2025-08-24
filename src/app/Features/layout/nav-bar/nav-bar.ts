import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../Core/services/authService/auth-service';
import { CartService } from '../../../Core/services/Cart/cart-service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.html',
  styleUrls: ['./nav-bar.css']
})
export class NavBar implements OnInit {
  isLogin: boolean = false;
  cartNumber: number = 0;

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void { 
    this.authService.userData.subscribe((data) => {
      this.isLogin = data != null;
    });
 
    this.cartService.cartNumber.subscribe({
      next: (num) => this.cartNumber = num
    });
  }

  logOut() {
    this.authService.logOut();
  }
}
