import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../_services/blogs.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  constructor(private blogsService: BlogsService) {
    this.blogs = [];
  }

  blogs: any;

  ngOnInit() {
    this.blogsService.getBlogs().subscribe(() => {
      this.blogs.push(...this.blogsService.blogSubject.value);
    });
  }
}
