import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../_services/blogs.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-blog-input',
  templateUrl: './blog-input.component.html',
  styleUrls: ['./blog-input.component.css'],
})
export class BlogInputComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogsService,
    private authService: AuthService
  ) {}

  blogForm: FormGroup;

  display = false;

  ngOnInit() {
    this.blogForm = this.formBuilder.group({
      blogTitle: ['', Validators.required],
      blogBody: ['', Validators.required],
    });

    this.authService.currentUser.subscribe((user) => {
      this.display = user.auth;
    });
  }

  get formControls() {
    return this.blogForm.controls;
  }

  submitBlog() {
    try {
      console.log(this.blogForm.value);
      this.blogService.submitBlog(this.blogForm.value);
    } catch (error) {
      console.error(error);
    }
  }
}
