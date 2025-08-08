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
import { authGuard } from './Core/guard/authGuard/auth-guard';
import { checkTokenGuard } from './Core/guard/checkToken/check-token-guard';

export const routes: Routes = [
    // Auth routes
    { 
        path: 'auth', 
        component: AuthLayout,
        children: [
            { path: 'login', component: Login, canActivate: [checkTokenGuard], title: 'Login' },
            { path: 'register', component: Register, canActivate: [checkTokenGuard], title: 'Register' },
            { path: '', redirectTo: 'login', pathMatch: 'full' }
        ]
    },
    
    // Main application routes
    {
        path: '', 
        component: MainLayout,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' }, 
            { path: 'home', component: Home, title: 'Home' },
            { path: 'products', component: Products, title: 'Products' },
            { path: 'productDetails/:id', component: ProductDetails, title: 'Product Details' },
            { path: 'brand', component: Brands, title: 'Brand' },
            { path: 'cart', component: Cart, canActivate: [authGuard], title: 'Cart' },
            { path: 'category', component: Categories, title: 'Category' }
        ]
    },
    
    // Fallback route
    { path: '**', component: NotFound, title: 'Not Found' }
];