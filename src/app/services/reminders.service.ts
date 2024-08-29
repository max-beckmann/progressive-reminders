import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

export interface Reminder {
  title: string;
  notes: string;
}

@Injectable({
  providedIn: 'root'
})
export class RemindersService {
  constructor(private readonly dbService: NgxIndexedDBService) {
  }

  add(newReminder: Reminder) {
    this.dbService.add('reminders', {
      title: 'Test Titel',
      notes: 'Test Notizen'
    }).subscribe((key) => {
      console.log('key: ', key);
    });
  }
}
