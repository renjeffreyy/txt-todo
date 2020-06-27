import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { BlogsService } from '../_services/blogs.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private blogsService: BlogsService
  ) {}

  auth = false;

  logOut() {
    console.log('logout');
    this.authService.logOut();
  }

  ngOnInit() {
    this.authService.loadUser();
    this.blogsService.getBlogs();
    this.authService.currentUser.subscribe((user) => {
      this.auth = user.auth;
    });
  }
}
