export interface StorageStatus {
  supported: boolean;
  persisted: boolean;
  usageBytes?: number;
  quotaBytes?: number;
}

/**
 * Prosi przeglądarkę o trwały magazyn, by iOS nie czyścił IndexedDB.
 * Wywołaj raz przy starcie aplikacji.
 */
export async function requestPersistentStorage(): Promise<boolean> {
  if (!navigator.storage?.persist) return false;
  try {
    if (await navigator.storage.persisted()) return true;
    return await navigator.storage.persist();
  } catch {
    return false;
  }
}

export async function getStorageStatus(): Promise<StorageStatus> {
  if (!navigator.storage) return { supported: false, persisted: false };
  const [persisted, estimate] = await Promise.all([
    navigator.storage.persisted?.().catch(() => false) ?? false,
    navigator.storage.estimate?.().catch(() => undefined),
  ]);
  return {
    supported: true,
    persisted: Boolean(persisted),
    usageBytes: estimate?.usage,
    quotaBytes: estimate?.quota,
  };
}

/** True, gdy aplikacja działa jako zainstalowana PWA (z ekranu początkowego). */
export function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}
