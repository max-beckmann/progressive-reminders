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
  color?: string;
  backgroundColor?: string;
  square?: boolean;
}

export interface AggregateItem {
  title: string;
  subtitle?: string;
  icon?: Icon;
  hasArrow?: boolean;
}

export interface List extends AggregateItem {
  id?: number;
  color: string;
}

export interface Reminder extends AggregateItem {
  id?: number;
  associatedList: List['id'];
  done: boolean;
  highlighted: boolean;
  priority: Priority;
  notes?: string;
  date?: Date;
  associatedNotification?: number;
  repeat?: Repetition;
  subReminders: Reminder['id'][];
}

export enum Priority {
  NONE = 'Ohne',
  LOW = 'Niedrig',
  MID = 'Mittel',
  HIGH = 'Hoch'
}

export enum Repetition {
  HOURLY = 'stündlich',
  DAILY = 'täglich',
  WEEKLY = 'wöchentlich',
  MONTHLY = 'monatlich'
}

export interface Input extends AggregateItem {
  placeholder: string;
  multiline?: boolean
}

export interface Link extends AggregateItem {
  location: string;
  state?: { [p: string]: any };
}
