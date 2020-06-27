import { Component, OnInit } from '@angular/core';
// import { Router, NavigationStart } from '@angular/router';
// import { Subscription } from 'rxjs';
import { AlertsService } from '../_services/alerts.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  constructor(private alertsService: AlertsService) {}

  alerts = [{ msg: 'test' }];

  removeAlert(alert) {
    console.log('alert removed');
  }

  ngOnInit() {
    // this.alerts =
    this.alertsService.alertObservable.subscribe((alert) => {
      this.alerts.push(...alert);
    });
  }
}
