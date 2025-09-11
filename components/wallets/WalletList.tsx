import type { Wallet } from '../../src/types';

export default function WalletList({ wallets }: { wallets: Wallet[] }) {
  return (
    <div className="mt-4 text-sm text-[var(--muted)]">
      Your wallets: {wallets.map(w => w.icon_name ?? '💼').join(' ') || '—'}
    </div>
  );
}
