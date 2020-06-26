import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../_services/blogs.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  constructor(private blogsService: BlogsService) {}

  blogs = null;

  ngOnInit() {
    this.blogsService.getBlogs();
    this.blogsService.blogObserve.subscribe((post) => {
      this.blogs = post;
      console.log('from blog init', this.blogs);
      console.log(
        'this is what the blog service looks like',
        this.blogsService.blogObserve,
        'this is the behavior subject'
      );
    });
  }
}
