import { Routes } from '@angular/router'; 
import { NotFound } from './Features/pages/not-found/not-found'; 
import { AuthLayout } from './Features/layout/auth-layout/auth-layout';
import { MainLayout } from './Features/layout/main-layout/main-layout'; 

export const routes: Routes = [
    // Auth routes
    { 
        path: 'auth', 
        component: AuthLayout,
        children: [
            {path:'login',loadComponent:()=>import('../app/Features/auth/login/login').then((C)=>C.Login)},
            {path:'register',loadComponent:()=>import('../app/Features/auth/register/register').then((C)=>C.Register)},
            {path:'forget-password',loadComponent:()=>import('../app/Features/auth/forget-password/forget-password').then((C)=>C.ForgetPassword)},
            { path: '', redirectTo: 'login', pathMatch: 'full' }
        ]
    },
    
    // Main application routes
    {
        path: '', 
        component: MainLayout,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' }, 
            {path: 'home', loadComponent:()=> import('../app/Features/pages/home/home').then((c)=>c.Home)}, 
            {path: 'products', loadComponent:()=> import('../app/Features/pages/products/products').then((c)=>c.Products)},
            {path:'productDetails/:id',loadComponent:()=>import('../app/Features/pages/product-details/product-details').then((c)=>c.ProductDetails)},
            {path:'brand',loadComponent:()=>import('../app/Features/pages/brands/brands').then((c)=>c.Brands)}, 
            {path :'cart',loadComponent:()=>import('../app/Features/pages/cart/cart').then((c)=>c.Cart)}, 
            {path:'allorders',loadComponent:()=>import('../app/Features/pages/all-orders/all-orders').then((c)=>c.AllOrders)},
            {path:'checkout/:id',loadComponent:()=>import('../app/Features/pages/checkout/checkout').then((C)=>C.Checkout)},
            {path:'category',loadComponent:()=>import('../app/Features/pages/categories/categories').then((c)=>c.Categories)},
        ]
    },
    
    // Fallback route
    { path: '**', component: NotFound, title: 'Not Found' }
];