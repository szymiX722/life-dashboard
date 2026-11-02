import Dexie, { type Table } from 'dexie';

/**
 * Konwencje:
 * - kwoty w groszach (liczby całkowite) – unikamy błędów zmiennoprzecinkowych
 * - daty jako ISO 'YYYY-MM-DD' (lokalna data), znaczniki czasu jako pełne ISO
 */

export interface Account {
  id?: number;
  name: string;
  type: 'bank' | 'cash' | 'broker';
  currency: string;
  balance: number;
  archived?: boolean;
}

export interface Category {
  id?: number;
  name: string;
  icon: string;
  color: string;
  kind: 'income' | 'expense';
  monthlyLimit?: number;
}

export interface Transaction {
  id?: number;
  accountId: number;
  categoryId?: number;
  amount: number; // + wpływ, − wydatek
  date: string;
  note?: string;
  subscriptionId?: number;
  importHash?: string; // deduplikacja importu CSV
}

export interface Subscription {
  id?: number;
  name: string;
  amount: number;
  currency: string;
  cycle: 'weekly' | 'monthly' | 'yearly';
  nextDate: string;
  accountId?: number;
  categoryId?: number;
  active: boolean;
}

export interface SavingsGoal {
  id?: number;
  name: string;
  target: number;
  saved: number;
  deadline?: string;
  accountId?: number;
}

export interface Holding {
  id?: number;
  ticker: string;
  name: string;
  currency: string;
  units: number;
  avgPrice: number; // grosze na jednostkę
  lastPrice?: number;
  lastPriceDate?: string;
}

export interface Habit {
  id?: number;
  name: string;
  icon: string;
  routine: 'morning' | 'evening' | 'anytime';
  daysOfWeek: number[]; // 0 (niedziela) – 6 (sobota)
  createdAt: string;
  archived?: boolean;
}

export interface HabitLog {
  id?: number;
  habitId: number;
  date: string;
}

export interface Task {
  id?: number;
  title: string;
  done: boolean;
  dueDate?: string;
  remindAt?: string;
  createdAt: string;
}

export interface Countdown {
  id?: number;
  title: string;
  date: string;
  emoji?: string;
}

export interface Setting {
  key: string;
  value: unknown;
}

export class AppDB extends Dexie {
  accounts!: Table<Account, number>;
  categories!: Table<Category, number>;
  transactions!: Table<Transaction, number>;
  subscriptions!: Table<Subscription, number>;
  goals!: Table<SavingsGoal, number>;
  holdings!: Table<Holding, number>;
  habits!: Table<Habit, number>;
  habitLogs!: Table<HabitLog, number>;
  tasks!: Table<Task, number>;
  countdowns!: Table<Countdown, number>;
  settings!: Table<Setting, string>;

  constructor() {
    super('life-dashboard');
    this.version(1).stores({
      accounts: '++id, type',
      categories: '++id, kind',
      transactions: '++id, accountId, categoryId, date, &importHash, [accountId+date]',
      subscriptions: '++id, nextDate, active',
      goals: '++id',
      holdings: '++id, &ticker',
      habits: '++id, routine, archived',
      habitLogs: '++id, habitId, date, &[habitId+date]',
      tasks: '++id, done, dueDate',
      countdowns: '++id, date',
      settings: 'key',
    });
  }
}

export const db = new AppDB();

/** Nazwy wszystkich tabel – używane przez diagnostykę i (później) eksport. */
export const TABLE_NAMES = [
  'accounts',
  'categories',
  'transactions',
  'subscriptions',
  'goals',
  'holdings',
  'habits',
  'habitLogs',
  'tasks',
  'countdowns',
  'settings',
] as const;
