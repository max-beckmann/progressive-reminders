import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { database } from '../../../database';

export interface Notification {
  id?: number;
  title: string;
  options?: NotificationOptions;
  timing: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    private readonly swPush: SwPush
  ) {
  }

  async loadPreviousNotifications() {
    const savedNotifications = await database.notifications.toArray();
    const dueNotificationIds = savedNotifications.filter(notification => notification.timing.getTime() - Date.now() < 0).map(notification => notification.id!);
    await database.notifications.bulkDelete(dueNotificationIds);
    const activeNotifications = await database.notifications.toArray();
    activeNotifications.forEach(notification => this.schedule(notification));
  }

  get hasPermission(): boolean {
    return Notification.permission === 'granted';
  }

  requestPermission() {
    if(this.swPush.isEnabled) {
      void Notification.requestPermission();
    }
  }

  async schedule({ id, timing, title, options }: Notification): Promise<number | undefined> {
    let newId = undefined;

    if(!id) {
      newId = await database.notifications.add({
        title,
        options,
        timing,
      });
    }

    const delay = timing.getTime() - Date.now();
    if(delay > 0) {
      setTimeout(() => {
        this.show(id ?? newId!, title, options);
      }, delay);
    }

    return newId;
  }

  async show(id: number, title: string, options?: NotificationOptions) {
    if(Notification.permission !== 'granted') {
      this.requestPermission();
    }

    navigator.serviceWorker.ready.then(async registration => {
      await registration.showNotification(title, options);
      await database.notifications.delete(id);
    });
  }
}
