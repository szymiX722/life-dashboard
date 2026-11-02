import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { TabBar } from './components/ui/TabBar';
import { db } from './db/db';
import { seedIfNeeded } from './db/seed';
import { requestPersistentStorage } from './services/storage';
import Today from './modules/productivity/pages/Today';
import Habits from './modules/productivity/pages/Habits';
import FinanceHome from './modules/finance/pages/FinanceHome';
import SettingsPage from './modules/settings/SettingsPage';

async function bootstrap() {
  await requestPersistentStorage();
  await seedIfNeeded();
  await db.transaction('rw', db.settings, async () => {
    const current = ((await db.settings.get('launchCount'))?.value as number | undefined) ?? 0;
    await db.settings.put({ key: 'launchCount', value: current + 1 });
  });
}

let booted = false; // chroni przed podwójnym uruchomieniem w React StrictMode

export default function App() {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  useEffect(() => {
    if (booted) return;
    booted = true;
    bootstrap().catch((err) => console.error('Błąd inicjalizacji bazy', err));
  }, []);

  return (
    <>
      {needRefresh && (
        <button
          onClick={() => updateServiceWorker(true)}
          className="pt-safe fixed inset-x-0 top-0 z-20 bg-accent py-2 text-center text-[14px] font-semibold"
        >
          Dostępna nowa wersja – dotknij, aby odświeżyć
        </button>
      )}
      <Routes>
        <Route path="/" element={<Today />} />
        <Route path="/finanse" element={<FinanceHome />} />
        <Route path="/nawyki" element={<Habits />} />
        <Route path="/ustawienia" element={<SettingsPage />} />
      </Routes>
      <TabBar />
    </>
  );
}
