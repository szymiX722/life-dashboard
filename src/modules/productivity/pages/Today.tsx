import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { Page, ComingSoon } from '../../../components/ui/Page';

export default function Today() {
  const now = new Date();
  const dayName = format(now, 'EEEE', { locale: pl });
  const date = format(now, 'd MMMM yyyy', { locale: pl });

  return (
    <Page title="Dziś" subtitle={`${dayName.charAt(0).toUpperCase()}${dayName.slice(1)}, ${date}`}>
      <ComingSoon label="Zadania i przypomnienia na dziś pojawią się w kroku 4." />
      <ComingSoon label="Rutyny poranne i wieczorne wraz z seriami – krok 4." />
    </Page>
  );
}
