import { Component } from '@angular/core';
import { routes } from '../../../app.routes';
import { RouterOutlet } from '@angular/router';
import { NavBar } from "../nav-bar/nav-bar";

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, NavBar],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayout {

}
