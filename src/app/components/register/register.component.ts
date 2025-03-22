import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group(
      {
        email: [''],
        password: ['']
      }
    )
  }
  register() {
    if (this.registerForm.valid) {

      this.authService.register(this.registerForm.value).subscribe({
        next: (res) => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('navigation failed', err);
        }
      });
    }
  }
}

