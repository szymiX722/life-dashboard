import { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, TABLE_NAMES } from '../../db/db';
import { Page, Card } from '../../components/ui/Page';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import { getStorageStatus, isStandalone, type StorageStatus } from '../../services/storage';

function formatBytes(bytes?: number): string {
  if (bytes === undefined) return '–';
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 ** 3) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024 ** 3).toFixed(1)} GB`;
}

function Row({ label, value, ok }: { label: string; value: string; ok?: boolean }) {
  const color = ok === undefined ? 'text-label-2' : ok ? 'text-good' : 'text-warn';
  return (
    <div className="flex items-center justify-between border-b border-separator py-2.5 last:border-0">
      <span className="text-[16px]">{label}</span>
      <span className={`text-[16px] ${color}`}>{value}</span>
    </div>
  );
}

export default function SettingsPage() {
  const online = useOnlineStatus();
  const [storage, setStorage] = useState<StorageStatus | null>(null);

  useEffect(() => {
    getStorageStatus().then(setStorage);
  }, []);

  const launchCount = useLiveQuery(async () => (await db.settings.get('launchCount'))?.value as number | undefined, []);
  const counts = useLiveQuery(
    async () => Object.fromEntries(await Promise.all(TABLE_NAMES.map(async (n) => [n, await db.table(n).count()]))),
    [],
  );

  return (
    <Page title="Ustawienia" subtitle="Diagnostyka PWA i bazy lokalnej">
      <Card>
        <h2 className="mb-1 text-[13px] uppercase tracking-wide text-label-2">Aplikacja</h2>
        <Row label="Tryb" value={isStandalone() ? 'Zainstalowana' : 'Karta przeglądarki'} ok={isStandalone()} />
        <Row label="Połączenie" value={online ? 'Online' : 'Offline'} ok={online} />
        <Row label="Liczba uruchomień" value={String(launchCount ?? '…')} />
      </Card>

      <Card>
        <h2 className="mb-1 text-[13px] uppercase tracking-wide text-label-2">Pamięć</h2>
        <Row
          label="Trwały magazyn"
          value={storage ? (storage.persisted ? 'Przyznany' : 'Nie przyznany') : '…'}
          ok={storage?.persisted}
        />
        <Row label="Zajęte" value={formatBytes(storage?.usageBytes)} />
        <Row label="Limit" value={formatBytes(storage?.quotaBytes)} />
      </Card>

      <Card>
        <h2 className="mb-1 text-[13px] uppercase tracking-wide text-label-2">Rekordy w tabelach</h2>
        {TABLE_NAMES.map((name) => (
          <Row key={name} label={name} value={String(counts?.[name] ?? '…')} />
        ))}
      </Card>
    </Page>
  );
}
