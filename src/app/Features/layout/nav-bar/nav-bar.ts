// 
import { Component ,Input, OnInit} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../Core/services/authService/auth-service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css'
})
export class NavBar implements OnInit {
  isLogin: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.userData.subscribe((data) => {
      this.isLogin = data != null;
    });
  }

  logOut() {
    this.authService.logOut();
  }
}
