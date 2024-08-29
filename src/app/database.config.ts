import { DBConfig } from 'ngx-indexed-db';

export const databaseConfig: DBConfig = {
  name: 'progressiveRemindersDB',
  version: 3,
  objectStoresMeta: [{
    store: 'reminders',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'title', keypath: 'title', options: { unique: false } },
      { name: 'notes', keypath: 'notes', options: { unique: false } }
    ]
  }]
}
