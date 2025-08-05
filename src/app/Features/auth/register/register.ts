import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../Core/services/auth-service';
import { CommonModule } from '@angular/common'; 
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  errMessage: string = '';  
  Isloading: boolean = false;
  constructor(private auth: AuthService,private router:Router,private cdr: ChangeDetectorRef) {}

  registerForm:FormGroup= new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(3)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(6)]),
    rePassword:new FormControl('',[Validators.required,Validators.minLength(6)]),
    phone:new FormControl('',[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  });
  submitForm() {
      if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched();  
    return;
  }
  this.Isloading = true;
    this.auth.Register(this.registerForm.value).subscribe({
      next: (response) => {
        this.Isloading = false;
        if(response.message== 'success') 
          {
            this.router.navigate(['/login']);
          }
        console.log(response);
        this.registerForm.reset();
      },
      error: (error) => {
        this.errMessage = error.error.message;
        this.Isloading = false;
        this.cdr.detectChanges(); 
        console.log(error.error.message);
      }
    });
  }
}
