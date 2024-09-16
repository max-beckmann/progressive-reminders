import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';

export interface Notification {
  title: string;
  options?: NotificationOptions;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    private readonly swPush: SwPush
  ) {}

  get hasPermission(): boolean {
    return Notification.permission === 'granted';
  }

  requestPermission() {
    if(this.swPush.isEnabled) {
      void Notification.requestPermission();
    }
  }

  schedule(notification: Notification, on: Date) {
    const delay = on.getTime() - Date.now();

    if(delay > 0) {
      setTimeout(() => {
        this.show(notification);
      }, delay);
    }
  }

  show({ title, options }: Notification) {
    if(Notification.permission !== 'granted') {
      this.requestPermission();
    }

    navigator.serviceWorker.ready.then(registration => {
      void registration.showNotification(title, options);
    });
  }
}
