import Dexie, { Table } from 'dexie';
import { List, Reminder } from './model';
import { IconType } from './src/app/components/icon/icon.component';
import { Notification } from './src/app/services/notification.service';

export class AppDB extends Dexie {
  lists!: Table<List, number>;
  reminders!: Table<Reminder, number>;
  notifications!: Table<Notification, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(1).stores({
      lists: '++id',
      reminders: '++id, associatedList',
      notifications: '++id',
    });
    this.on('populate', () => this.populateWithDefaultList());
  }

  async populateWithDefaultList() {
    await database.lists.add({
      title: 'Meine Liste',
      icon: {
        type: IconType.LIST,
        backgroundColor: '#9D8563'
      },
      color: '#9D8563'
    });
  }
}

export const database = new AppDB();
