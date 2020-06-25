import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../_models/user';
import { JwtResponse } from '../_models/jwt-response';
import { RegisterUser } from '../_models/register-user';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('x-auth-token', localStorage.getItem('ACCESS_TOKEN'));

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  authSubject = new BehaviorSubject(false);
  AUTH_SERVER = 'http://localhost:5000';

  signIn(user: User): Observable<JwtResponse> {
    return this.httpClient.post(`${this.AUTH_SERVER}/api/auth`, user).pipe(
      tap(async (res: JwtResponse) => {
        if (res.token) {
          localStorage.setItem('ACCESS_TOKEN', res.token);
          this.authSubject.next(true);
        }
      })
    );
  }

  isAuthenticated() {
    return this.authSubject.asObservable();
  }

  logOut() {
    localStorage.removeItem('ACCESS_TOKEN');
    this.authSubject.next(false);
  }

  register(user: RegisterUser): Observable<JwtResponse> {
    console.log(user);
    return this.httpClient.post(`${this.AUTH_SERVER}/api/users`, user).pipe(
      tap(async (res: JwtResponse) => {
        console.log(res);
        if (res.token) {
          localStorage.setItem('ACCESS_TOKEN', res.token);
          this.authSubject.next(true);
        }
      })
    );
  }
}
