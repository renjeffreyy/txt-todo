import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../_services/blogs.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private blogsService: BlogsService) {}

  blogs = null;

  userId = null;

  ngOnInit() {
    //get blogs

    this.blogsService.getFilterUserBlogs();
    this.blogsService.filteredBlogObserve.subscribe((posts) => {
      this.blogs = posts;
    });
  }

  deletePost(id: string) {
    this.blogsService.deletePosts(id);
    this.blogsService.getBlogs();
    this.blogsService.getFilterUserBlogs();
    this.blogs = this.blogs.filter((id) => {
      return this.blogs._id !== id;
    });
  }
}
