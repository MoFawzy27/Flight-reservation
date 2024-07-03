import { Injectable } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSubject = new Subject<any>();
  notificationState = this.notificationSubject.asObservable();

  constructor() { }

  showNotification(message: string, color: string, duration: number = 2000) {
    this.notificationSubject.next({ message, color });
    timer(duration).pipe(take(1)).subscribe(() => {
      this.notificationSubject.next(null); // Hide notification after duration
    });
  }
}
