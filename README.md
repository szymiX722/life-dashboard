# Life Dashboard (PWA)

Osobisty dashboard offline-first: Vite + React + TypeScript + Tailwind v4 + Dexie (IndexedDB).

## Uruchomienie lokalne

```bash
npm install
npm run dev        # http://localhost:5173 (dostępne też w sieci lokalnej)
npm run build      # produkcyjny build z Service Workerem
npm run preview    # podgląd builda
```

## Wdrożenie za darmo (GitHub Pages)

1. Utwórz repozytorium na GitHubie i wypchnij kod na gałąź `main`.
2. Settings → Pages → Source: **GitHub Actions**.
3. Workflow `.github/workflows/deploy.yml` zbuduje i opublikuje aplikację pod
   `https://<login>.github.io/<repo>/`.

## Instalacja na iPhonie

Otwórz adres w **Safari** → Udostępnij → **Dodaj do ekranu początkowego**.
Test offline: uruchom z ekranu początkowego, włącz tryb samolotowy, uruchom ponownie.
Zakładka Ustawienia pokazuje tryb (zainstalowana/przeglądarka), status offline,
trwały magazyn i liczbę rekordów.

## Uwagi

- Kwoty w groszach (liczby całkowite), daty jako `YYYY-MM-DD`.
- Zmiany schematu bazy: dodawaj `this.version(2).stores({...})` w `src/db/db.ts`, nie edytuj wersji 1.
- Dane żyją tylko na urządzeniu – w kroku 5 dochodzi eksport/import JSON jako kopia zapasowa.
