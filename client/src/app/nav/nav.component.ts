import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(private authService: AuthService) {}

  auth = false;

  logOut() {
    console.log('logout');
    this.authService.logOut();
  }

  ngOnInit() {
    this.authService.currentUser.subscribe((user) => {
      this.auth = user.auth;
    });
  }
}
