export const BudgetIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...p}>
    <path d="M3 7h14a4 4 0 1 1 0 8H3z" fill="currentColor" opacity=".15" />
    <rect x="3" y="7" width="18" height="10" rx="2" stroke="currentColor" fill="none" />
    <circle cx="16" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

export const WalletIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...p}>
    <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" fill="none" />
    <path d="M16 6v4h5" stroke="currentColor" fill="none" />
    <circle cx="16.5" cy="12" r="1.25" fill="currentColor" />
  </svg>
);

export const PlusIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...p}>
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ChartIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...p}>
    <path d="M4 19V5M9 19v-8M14 19v-4M19 19v-11" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const SettingsIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...p}>
    <path d="M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M19 12a7 7 0 0 0-.2-1.6l2-1.4-2-3.4-2.3 1a7 7 0 0 0-2.8-1.6l-.4-2.5h-4l-.4 2.5a7 7 0 0 0-2.8 1.6l-2.3-1-2 3.4 2 1.4A7 7 0 0 0 5 12a7 7 0 0 0 .2 1.6l-2 1.4 2 3.4 2.3-1a7 7 0 0 0 2.8 1.6l.4 2.5h4l.4-2.5a7 7 0 0 0 2.8-1.6l2.3 1 2-3.4-2-1.4c.1-.5.2-1.1.2-1.6z" stroke="currentColor" fill="none" />
  </svg>
);
