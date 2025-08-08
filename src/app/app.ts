import { Component } from '@angular/core'; 
import { Router, NavigationEnd, RouterOutlet, RouterModule } from '@angular/router';
import { AuthService } from './Core/services/authService/auth-service'; 
import { NavBar } from "./Features/layout/nav-bar/nav-bar";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root', 
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
   imports: [RouterModule, CommonModule]
})
export class App {
  
}
