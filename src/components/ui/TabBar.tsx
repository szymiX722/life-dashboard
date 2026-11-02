import { NavLink } from 'react-router-dom';
import { CalendarCheck, Wallet, Repeat, Settings, type LucideIcon } from 'lucide-react';

const TABS: { to: string; label: string; icon: LucideIcon }[] = [
  { to: '/', label: 'Dziś', icon: CalendarCheck },
  { to: '/finanse', label: 'Finanse', icon: Wallet },
  { to: '/nawyki', label: 'Nawyki', icon: Repeat },
  { to: '/ustawienia', label: 'Ustawienia', icon: Settings },
];

export function TabBar() {
  return (
    <nav className="pb-safe fixed inset-x-0 bottom-0 z-10 border-t border-separator bg-surface/80 backdrop-blur-xl">
      <ul className="mx-auto grid max-w-xl grid-cols-4">
        {TABS.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 pt-2 pb-1.5 text-[10px] font-medium transition-colors ${
                  isActive ? 'text-accent' : 'text-label-2'
                }`
              }
            >
              <Icon size={24} strokeWidth={1.8} />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
