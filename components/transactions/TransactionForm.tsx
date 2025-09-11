import { useState } from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import type { Wallet, Category, TransactionType } from '../../src/types';
import { createTransaction } from '../../src/services/transactions';

function nowLocalForInput() {
  const n = new Date();
  const off = n.getTimezoneOffset() * 60000;
  return new Date(n.getTime() - off).toISOString().slice(0, 16); // yyyy-MM-ddTHH:mm
}

export default function TransactionForm({
  wallets,
  categories,
  onCreated,
}: {
  wallets: Wallet[];
  categories: Category[];
  onCreated: () => void;
}) {
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<TransactionType>('expense');
  const [walletId, setWalletId] = useState<number | ''>('');
  const [categoryId, setCategoryId] = useState<number | ''>('');
  const [note, setNote] = useState('');
  const [when, setWhen] = useState(nowLocalForInput());
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!walletId) return alert('Pick wallet');
    if (type === 'expense' && !categoryId) return alert('Category required for expense');

    try {
      setLoading(true);
      await createTransaction({
        amount: Number(amount) || 0,
        type,
        wallet_id: Number(walletId),
        category_id: type === 'expense' ? (categoryId as number) : null,
        note: note || null,
        created_at: new Date(when).toISOString(),
      });
      // reset a few fields for faster entry
      setAmount(0);
      setNote('');
      if (type === 'expense') setCategoryId('');
      onCreated();
    } catch (e: any) {
      alert(e.message ?? 'Failed to create transaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Add Transaction">
      <div className="grid md:grid-cols-6 gap-3 items-end">
        <input
          type="number"
          className="p-2 rounded-lg md:col-span-1"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value || 0))}
        />

        <select
          className="p-2 rounded-lg md:col-span-1"
          value={type}
          onChange={(e) => setType(e.target.value as TransactionType)}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <select
          className="p-2 rounded-lg md:col-span-1"
          value={walletId}
          onChange={(e) => setWalletId(e.target.value ? Number(e.target.value) : '')}
        >
          <option value="">Wallet</option>
          {wallets.map((w) => (
            <option key={w.id} value={w.id}>
              {w.icon_name ?? '💼'} #{w.id}
            </option>
          ))}
        </select>

        <select
          className="p-2 rounded-lg md:col-span-1"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : '')}
          disabled={type === 'income'}
        >
          <option value="">
            {type === 'income' ? 'Category (optional)' : 'Category (required)'}
          </option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.icon_name ?? '📁'} {c.target ?? '(untitled)'}
            </option>
          ))}
        </select>

        <input
          className="p-2 rounded-lg md:col-span-1"
          placeholder="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <input
          className="p-2 rounded-lg md:col-span-1"
          type="datetime-local"
          value={when}
          onChange={(e) => setWhen(e.target.value)}
        />
      </div>

      <div className="mt-3">
        <Button onClick={submit} disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </Card>
  );
}
