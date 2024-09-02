import { IconType } from './src/app/components/icon/icon.component';

export interface Aggregate {
  type: AggregateType;
  items: AggregateItem[];
}

export enum AggregateType {
  REMINDERS,
  INPUTS,
  LISTS
}

export interface Item {
  title: string;
  subtitle: string;
  icon?: IconType;
  hasArrow: boolean;
}

export type AggregateItem = List | Reminder | Input;

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
