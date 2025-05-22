import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (!password || !confirmPassword) {
      return null;
    }
    return password.value === confirmPassword.value ? null : { mismatch: true };
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  errorMessage: string | null = null;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: passwordMatchValidator() });

    this.registerForm.valueChanges.subscribe(value => {
      console.log('Form value changed:', value);
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    console.log('Register form submitted');
    this.submitted = true;
    if (this.registerForm.invalid) {
      console.log('Register form invalid', this.registerForm.errors);
      return;
    }
    this.loading = true;
    this.errorMessage = null;

    this.authService.register({
      fullName: this.f.fullName.value,
      email: this.f.email.value,
      password: this.f.password.value
    }).subscribe({
      next: () => {
        console.log('Registration successful');
        alert('Registration successful! You can now log in.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration failed', err);
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Registration failed. Please try again.';
        }
        this.loading = false;
      }
    });
  }

  testClick(): void {
    console.log('Create Account button clicked');
  }

  // Remove onButtonClick method to fix template error
}
