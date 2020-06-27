import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { BlogsService } from '../_services/blogs.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private blogsService: BlogsService,
    private authService: AuthService,
    private router: Router
  ) {}

  blogs = [];

  userId = null;

  ngOnInit() {
    //get blogs
    this.blogsService.getFilterUserBlogs();
    this.blogsService.filteredBlogObserve.subscribe((posts) => {
      this.blogs.push(...posts);
      console.log(
        'this is the filted blog',
        this.blogs,
        'these are the posts',
        posts
      );
    });
  }

  deletePost(id: string) {
    console.log('deleted');
    this.blogsService.deletePosts(id);
    console.log(id);
  }
}
