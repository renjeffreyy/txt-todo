import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Alert } from '../_models/alert';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor() {}

  private alertBehaviorSubject = new BehaviorSubject<Alert[]>([]);
  public alertObservable = this.alertBehaviorSubject.asObservable();

  setAlert(msg) {
    alert(msg);
  }

  removeAlert(msg) {
    const array = [];

    //loop through alert observable and set the behavior subject
    //to the array without the message

    this.alertObservable.subscribe((alert) => {
      alert
        .filter((x) => {
          x.msg !== msg;
        })
        .map((x) => array.push(x));
    });
    this.alertBehaviorSubject.next([...array]);
  }
}
