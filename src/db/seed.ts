import { db, type Category } from './db';

const DEFAULT_CATEGORIES: Omit<Category, 'id'>[] = [
  { name: 'Jedzenie', icon: 'utensils', color: '#ff9f0a', kind: 'expense' },
  { name: 'Transport', icon: 'bus', color: '#0a84ff', kind: 'expense' },
  { name: 'Mieszkanie', icon: 'home', color: '#bf5af2', kind: 'expense' },
  { name: 'Rozrywka', icon: 'gamepad-2', color: '#ff375f', kind: 'expense' },
  { name: 'Zdrowie', icon: 'heart-pulse', color: '#30d158', kind: 'expense' },
  { name: 'Subskrypcje', icon: 'repeat', color: '#64d2ff', kind: 'expense' },
  { name: 'Inne', icon: 'circle-ellipsis', color: '#8e8e93', kind: 'expense' },
  { name: 'Wynagrodzenie', icon: 'banknote', color: '#30d158', kind: 'income' },
  { name: 'Inne wpływy', icon: 'plus-circle', color: '#64d2ff', kind: 'income' },
];

/**
 * Wypełnia bazę danymi startowymi. Idempotentne: działa tylko, gdy nie było
 * jeszcze seedu (flaga w tabeli settings), więc usunięcie kategorii przez
 * użytkownika nie powoduje ich ponownego pojawienia się.
 */
export async function seedIfNeeded(): Promise<void> {
  await db.transaction('rw', db.categories, db.settings, async () => {
    const seeded = await db.settings.get('seeded');
    if (seeded) return;
    await db.categories.bulkAdd(DEFAULT_CATEGORIES);
    await db.settings.put({ key: 'seeded', value: new Date().toISOString() });
  });
}
