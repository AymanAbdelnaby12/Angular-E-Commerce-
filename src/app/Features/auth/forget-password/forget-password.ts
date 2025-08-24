import { Router } from '@angular/router';
import { Auth } from './../../../Shared/Interfaces/auth';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { ResetPasswordService } from '../../../Core/services/resetPassword/reset-password-service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../Core/services/authService/auth-service';
import { Console } from 'console';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './forget-password.html',
  styleUrls: ['./forget-password.css']
})
export class ForgetPassword {
  errmassge:string = '';  
  Isloading:boolean = false;
  steps:number = 1;
  constructor(private resetPassword: ResetPasswordService,
    private toastr:ToastrService,
    private Auth:AuthService,
    private router:Router,
    private cdr:ChangeDetectorRef){
    console.log(this.steps)
  }
  sendEmailForm:FormGroup=new FormGroup({
  email:new FormControl('',[Validators.required,Validators.email]) 
})
verifyCodeForm:FormGroup=new FormGroup({
  resetCode:new FormControl('',[Validators.required])
})
ResetPasswordForm:FormGroup=new FormGroup({
  email:new FormControl('',[Validators.required,Validators.email]),
  newPassword:new FormControl('',[Validators.required,Validators.minLength(6)])
  })

  submitEmail(){
    this.resetPassword.verifyEmail(this.sendEmailForm.value).subscribe({
      next: (response) => {
        if(response.statusMsg=='success'){
          this.steps = 2; 
          this.toastr.success(response.message, 'Success');
          this.cdr.detectChanges();
        }
      },
      error: (error) => {
        console.error('Error sending email:', error);
        this.errmassge = error.message;
        this.toastr.error(this.errmassge, 'Error');
      }
    });
  }

  submitCode(){
    this.resetPassword.verifyCode(this.verifyCodeForm.value).subscribe({
      next: (response) => {
        if(response.status=='Success'){
          this.steps = 3; 
          this.toastr.success(response.message, 'Success');
          this.cdr.detectChanges();
        }
      },
      error: (error) => {
        console.error('Error verifying code:', error);
        this.errmassge = error.message;
        this.toastr.error(this.errmassge, 'Error');
      }
    });
  }

  submitPasswordReset(){
    this.resetPassword.resetPassword(this.ResetPasswordForm.value).subscribe({
      next: (response) => {
        console.log(response);
        if(response.token){  
          localStorage.setItem('userToken', response.token); 
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        console.error('Error resetting password:', error);
        console.log("error",error.error);
        console.log("ErrorMessage",error.error.message);
        this.errmassge = error.message;
        this.toastr.error(this.errmassge, 'Error');
        this.cdr.detectChanges();
        // this.router.navigate(['/auth/login']);
      }
    });
  }
}