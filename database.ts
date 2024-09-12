import Dexie, { Table } from 'dexie';
import { List, Reminder } from './model';
import { IconType } from './src/app/components/icon/icon.component';
import { Colors } from './src/app/enums/colors';

export class AppDB extends Dexie {
  lists!: Table<List, number>;
  reminders!: Table<Reminder, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(1).stores({
      lists: '++id',
      reminders: '++id, associatedList',
    });
    this.on('populate', () => this.populateWithDefaultLists());
  }

  async populateWithDefaultLists() {
    await database.lists.bulkAdd([
      {
        title: 'Custom List 1',
        icon: {
          type: IconType.FLAG,
          backgroundColor: Colors.BLUE
        },
        color: Colors.BLUE
      },
      {
        title: 'Custom List 2',
        icon: {
          type: IconType.FLAG,
          backgroundColor: Colors.RED
        },
        color: Colors.RED
      }
    ]);
  }
}

export const database = new AppDB();
