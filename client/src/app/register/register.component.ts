import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  registerForm: FormGroup;
  isSubmitted = false;

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    });
  }

  get formControls() {
    return this.registerForm.controls;
  }

  register() {
    this.isSubmitted = true;
    console.log(this.registerForm.value);
    try {
      if (this.registerForm.invalid) {
        return;
      } else if (
        this.registerForm.value.password !==
        this.registerForm.value.passwordConfirm
      ) {
        console.log('passwords must match');
      } else {
        this.authService.register(this.registerForm.value).subscribe((res) => {
          this.router.navigateByUrl('/dashboard');
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
