import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../../db/db';
import { Page, Card, ComingSoon } from '../../../components/ui/Page';

export default function FinanceHome() {
  const categories = useLiveQuery(() => db.categories.count(), []);

  return (
    <Page title="Finanse" subtitle="Budżet, subskrypcje, cele i portfel">
      <Card>
        <p className="text-[13px] uppercase tracking-wide text-label-2">Baza danych</p>
        <p className="mt-1 text-[17px]">
          Wczytane kategorie startowe: <span className="font-semibold text-good">{categories ?? '…'}</span>
        </p>
      </Card>
      <ComingSoon label="Konta, transakcje i dostępny budżet – krok 2." />
    </Page>
  );
}
