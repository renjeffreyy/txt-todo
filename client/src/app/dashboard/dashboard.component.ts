import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../_services/blogs.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private blogsService: BlogsService) {}

  blogs = [];

  userId = null;

  ngOnInit() {
    //get blogs
    this.blogsService.getFilterUserBlogs();
    this.blogsService.filteredBlogObserve.subscribe((posts) => {
      this.blogs.push(...posts);
    });
  }

  deletePost(id: string) {
    this.blogsService.deletePosts(id);
  }
}
