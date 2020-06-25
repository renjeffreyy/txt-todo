import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Blogs } from '../_models/blogs';

const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('x-auth-token', localStorage.getItem('ACCESS_TOKEN'));

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  constructor(private httpClient: HttpClient) {}

  blogSubject = new BehaviorSubject([]);
  AUTH_SERVER = 'http://localhost:5000';

  getBlogs() {
    try {
      return this.httpClient.get(`${this.AUTH_SERVER}/api/blog`).pipe(
        tap(async (res: any) => {
          this.blogSubject.next([...res]);
        })
      );
    } catch (error) {
      console.error(error);
    }
  }

  submitBlog(post: Blogs) {
    try {
      console.log('service submit init');
      return this.httpClient
        .post(`${this.AUTH_SERVER}/api/blog`, post, { headers })
        .subscribe((res) => {
          console.log('from servive', res);
          this.getBlogs();
        });
    } catch (error) {
      console.error(error);
    }
  }
}
