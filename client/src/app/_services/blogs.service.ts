import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Blogs } from '../_models/blogs';
import { AuthService } from '../_services/auth.service';
import { AlertsService } from '../_services/alerts.service';
import { Alert } from '../_models/alert';

const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('x-auth-token', localStorage.getItem('ACCESS_TOKEN'));

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private alertsService: AlertsService
  ) {}

  private blogSubject = new BehaviorSubject([]);
  public blogObserve = this.blogSubject.asObservable();

  AUTH_SERVER = 'http://localhost:5000';

  getBlogs() {
    try {
      return this.httpClient
        .get(`${this.AUTH_SERVER}/api/blog`)
        .subscribe((res: any) => {
          this.blogSubject.next([...res]);
        });
    } catch (error) {
      console.error(error);
    }
  }

  submitBlog(post: Blogs) {
    try {
      console.log('service submit init');
      return this.httpClient
        .post(`${this.AUTH_SERVER}/api/blog`, post, { headers })
        .subscribe((res: Alert) => {
          console.log('from servive', res);
          this.getBlogs();
          alert(res.msg);
        });
    } catch (error) {
      console.error(error);
    }
  }
  private filteredBlogSubject = new BehaviorSubject([]);
  public filteredBlogObserve = this.filteredBlogSubject.asObservable();

  getFilterUserBlogs() {
    let id;
    this.authService.currentUser.subscribe((user) => {
      id = user.id;
    });
    const initArray = this.blogSubject.getValue();

    const filteredArray = initArray.filter((blog) => {
      return blog.author == id;
    });
    this.filteredBlogSubject.next([...filteredArray]);
  }

  //delete post
  deletePosts(id: string) {
    try {
      return this.httpClient
        .delete(`${this.AUTH_SERVER}/api/blog/${id}`, { headers })
        .subscribe((res: Alert) => {
          console.log('this is response from delete', res);
          alert(res.msg);
          this.getBlogs();
        });
    } catch (error) {
      console.error(error);
    }
  }
}
