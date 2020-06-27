import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  authForm: FormGroup;
  isSubmitted = false;

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get formControls() {
    return this.authForm.controls;
  }

  signIn() {
    try {
      this.isSubmitted = true;
      console.log(this.authForm.value);
      if (this.authForm.invalid) {
        return;
      }
      this.authService.signIn(this.authForm.value).subscribe((res) => {
        this.router.navigateByUrl('/');
      });
    } catch (error) {
      console.error(error);
    }
  }
}
