import type { ReactNode } from 'react';

export function Page({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <main className="mx-auto max-w-xl px-4 pb-28">
      <header className="pt-safe pb-4 pt-6">
        <h1 className="text-[34px] font-bold leading-tight tracking-tight">{title}</h1>
        {subtitle && <p className="mt-0.5 text-[15px] text-label-2">{subtitle}</p>}
      </header>
      <div className="space-y-3">{children}</div>
    </main>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-2xl bg-surface p-4 ${className}`}>{children}</section>;
}

export function ComingSoon({ label }: { label: string }) {
  return (
    <Card>
      <p className="text-[15px] text-label-2">{label}</p>
    </Card>
  );
}
