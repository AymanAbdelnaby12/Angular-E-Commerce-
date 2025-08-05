import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from "../nav-bar/nav-bar";

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, NavBar],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css'
})
export class AuthLayout {

}
