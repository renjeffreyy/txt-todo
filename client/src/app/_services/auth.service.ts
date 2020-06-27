import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../_models/user';
import { JwtResponse } from '../_models/jwt-response';
import { RegisterUser } from '../_models/register-user';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { CurrentUser } from '../_models/current-user';

const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('x-auth-token', localStorage.getItem('ACCESS_TOKEN'));

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  private currentUserSubject = new BehaviorSubject<CurrentUser>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    auth: false,
  });
  public currentUser = this.currentUserSubject.asObservable();

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  AUTH_SERVER = 'http://localhost:5000';

  loadUser() {
    console.log('from the load user method');
    try {
      if (localStorage.ACCESS_TOKEN) {
        return this.httpClient
          .get(`${this.AUTH_SERVER}/api/auth`, { headers })
          .subscribe((res) => {
            this.currentUserSubject.next({
              id: res['_id'],
              firstName: res['firstName'],
              lastName: res['lastName'],
              email: res['email'],
              auth: true,
            });
          });
      }
    } catch (error) {
      localStorage.ACCESS_TOKEN.delete();
      console.error(error);
    }
  }

  signIn(user: User): Observable<JwtResponse> {
    return this.httpClient.post(`${this.AUTH_SERVER}/api/auth`, user).pipe(
      tap(async (res: JwtResponse) => {
        const response = await res.token;
        if (response) {
          localStorage.setItem('ACCESS_TOKEN', response);
          this.loadUser();
        }
      })
    );
  }

  logOut() {
    console.log('service logout');
    localStorage.removeItem('ACCESS_TOKEN');
    this.currentUserSubject.next({
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      auth: false,
    });
  }

  register(user: RegisterUser): Observable<JwtResponse> {
    return this.httpClient.post(`${this.AUTH_SERVER}/api/users`, user).pipe(
      tap(async (res: JwtResponse) => {
        console.log(res);
        if (res.token) {
          localStorage.setItem('ACCESS_TOKEN', res.token);
          this.loadUser();
        }
      })
    );
  }
}
