import { Routes } from '@angular/router'; 
import { Home } from './Features/pages/home/home';
import { Products } from './Features/pages/products/products';
import { ProductDetails } from './Features/pages/product-details/product-details';
import { Cart } from './Features/pages/cart/cart';
import { Brands } from './Features/pages/brands/brands';
import { Categories } from './Features/pages/categories/categories';
import { NotFound } from './Features/pages/not-found/not-found'; 
import { AuthLayout } from './Features/layout/auth-layout/auth-layout';
import { MainLayout } from './Features/layout/main-layout/main-layout';
import { Login } from './Features/auth/login/login';   
import { Register } from './Features/auth/register/register'; 
import { concat } from 'rxjs'; 

export const routes: Routes = [
    { path: '', component: AuthLayout
        ,children: [
            {path: 'login',component: Login ,title: 'Login'},
            {path: 'register', component:Register , title: 'Register'},
        ]}, 
    {path:'', component: MainLayout, title: 'Main Layout'
        ,children: [
            {path: '', redirectTo: 'home', pathMatch: 'full', title: 'Home'},
            {path: 'home',component:Home, title: 'Home'},
            {path: 'products', component: Products, title: 'Products'},
            {path: 'productDetails', component: ProductDetails, title: 'productDetails'},
            {path: 'cart',component: Cart, title: 'Cart'},
            {path: 'brand',component: Brands, title: 'Brand'},
            {path: 'category', component: Categories, title: 'Category'},
            {path:'**',component:NotFound, title: 'Not Found'}
        ]},  
];

