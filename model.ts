import { IconType } from './src/app/components/icon/icon.component';

export interface Aggregate {
  type: AggregateType;
  items: AggregateItem[];
}

export enum AggregateType {
  REMINDERS,
  INPUTS,
  LISTS,
  LINKS
}

export interface Item {
  title: string;
  subtitle?: string;
  icon?: Icon;
  hasArrow?: boolean;
}

export interface Icon {
  type: IconType;
  backgroundColor?: string;
}

export type AggregateItem = List | Reminder | Input | Link;

export interface List {
  id?: number;
  title: string;
  icon: IconType;
  color: string;
}

export interface Reminder {
  id?: number;
  associatedList: List['id'];
  title: string;
  notes?: string;
  done: boolean;
  subReminders: Reminder['id'][];
}

export interface Input {
  placeholder: string;
  multiline?: boolean
}

export interface Link {
  title: string;
  location: string;
}
