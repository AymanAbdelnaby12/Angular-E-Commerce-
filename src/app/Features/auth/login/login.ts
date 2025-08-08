import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { Router } from '@angular/router';
import { AuthService } from '../../../Core/services/authService/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  errMessage: string = '';
  Isloading: boolean = false;
  constructor(private auth: AuthService, private router: Router, private cdr: ChangeDetectorRef) {}
  submitForm() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.Isloading = true;
    this.auth.Login(this.loginForm.value).subscribe({
      next: (response) => {
        this.Isloading = false;
        if (response.message === 'success') { 
          localStorage.setItem('userToken', response.token);
          this.auth.decodeUserData();
          this.router.navigate(['/home']);
        }
        console.log(response);
        this.loginForm.reset();
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
