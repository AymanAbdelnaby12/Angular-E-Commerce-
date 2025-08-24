import { CartService } from './../../../Core/services/Cart/cart-service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {
  Isloading:boolean = false;
  cartId!: string;
constructor(private CartService: CartService,private ActivatedRoute: ActivatedRoute){
  ActivatedRoute.params.subscribe({
    next:(res)=>{ 
      this.cartId = res['id'];
    }
  })
}
CheckOutForm: FormGroup=new FormGroup({
  details: new FormControl('', [Validators.required]),
  phoneNumber: new FormControl('', [Validators.required]),
  City: new FormControl('', [Validators.required])
});


submitForm() {
this.CartService.Checkout(this.cartId,this.CheckOutForm.value).subscribe({
      next:(res)=>{ 
        window.location.href = res.session.url
        console.log("Checkout successful",res);
        console.log("Checkout successful",window.location.href);

      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
}
