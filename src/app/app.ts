import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from "./Features/layout/nav-bar/nav-bar"; 

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'E-Commerce';
}
