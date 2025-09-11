import type { Tx, Wallet, Category } from '../../src/types';

export default function TransactionList({
  tx,
  wallets,
  categories,
}: {
  tx: Tx[];
  wallets: Wallet[];
  categories: Category[];
}) {
  if (!tx.length) {
    return <div className="text-[var(--muted)]">No transactions yet.</div>;
  }

  return (
    <div className="space-y-2">
      {tx.map((row) => {
        const wallet = wallets.find((w) => w.id === row.wallet_id);
        const cat = categories.find((c) => c.id === (row.category_id ?? -1));

        return (
          <div
            key={row.id}
            className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2"
          >
            <div className="flex items-center gap-3">
              <div className="text-xl">{wallet?.icon_name ?? '💼'}</div>
              <div>
                <div className="text-sm opacity-80">
                  {new Date(row.created_at).toLocaleString()}
                </div>
                <div className="text-xs opacity-60">
                  {row.type === 'expense' ? `${cat?.icon_name ?? ''} ${cat?.target ?? ''}` : 'Income'}
                </div>
                <div className="text-xs opacity-60">{row.note ?? ''}</div>
              </div>
            </div>

            <div className={row.type === 'expense' ? 'text-red-400' : 'text-emerald-400'}>
              {row.type === 'expense' ? '-' : '+'}
              {row.amount.toLocaleString()}
            </div>
          </div>
        );
      })}
    </div>
  );
}
