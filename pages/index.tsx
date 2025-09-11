import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { AuthContext } from '../src/context/AuthContext';
import { supabase } from '../src/lib/supabaseClient';

import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

import CategoryGroupForm from '../components/categories/CategoryGroupForm';
import CategoryForm from '../components/categories/CategoryForm';
import TransactionForm from '../components/transactions/TransactionForm';
import TransactionList from '../components/transactions/TransactionList';

import type { Wallet, CategoryGroup, Category, Tx } from '../src/types';
import { listWallets, createWallet } from '../src/services/wallets';
import { listCategoryGroups } from '../src/services/categoryGroups';
import { listCategories } from '../src/services/categories';
import { listTransactions } from '../src/services/transactions';

export default function Dashboard() {
  const session = useContext(AuthContext);
  const router = useRouter();

  // data state
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [groups, setGroups] = useState<CategoryGroup[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tx, setTx] = useState<Tx[]>([]);

  // local form state (Wallet creation)
  const [wIcon, setWIcon] = useState('💳');
  const [wAmount, setWAmount] = useState<number>(0);
  const [savingWallet, setSavingWallet] = useState(false);

  // redirect to /login if signed out
  useEffect(() => {
    if (session === null) router.replace('/login');
  }, [session, router]);

  // fetch all lists
  async function refresh() {
    try {
      const [w, g, c, t] = await Promise.all([
        listWallets(),
        listCategoryGroups(),
        listCategories(),
        listTransactions(50),
      ]);
      setWallets(w);
      setGroups(g);
      setCategories(c);
      setTx(t);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (session?.user) refresh();
  }, [session?.user]);

  // sign out
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  // create wallet
  const handleCreateWallet = async () => {
    if (!session?.user) return;
    try {
      setSavingWallet(true);
      await createWallet({
        user_id: session.user.id,
        icon_name: wIcon || null,
        amount: Number(wAmount) || 0,
      });
      setWAmount(0);
      await refresh();
    } catch (e: any) {
      alert(e?.message ?? 'Failed to create wallet');
    } finally {
      setSavingWallet(false);
    }
  };

  if (session === undefined) return <div className="p-6">Loading…</div>;
  if (!session) return null;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">ZuMoney</h1>
        <div className="text-sm text-[var(--muted)]">
          Signed in as {session.user.email ?? session.user.id}
          <Button className="ml-3" onClick={signOut}>Sign out</Button>
        </div>
      </div>

      {/* Top grid: Wallet + CategoryGroup + Category */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Create Wallet */}
        <Card title="Create Wallet">
          <div className="space-y-3">
            <input
              className="w-full p-2 rounded-lg"
              placeholder="Icon (emoji or name)"
              value={wIcon}
              onChange={(e) => setWIcon(e.target.value)}
            />
            <input
              type="number"
              className="w-full p-2 rounded-lg"
              placeholder="Initial amount"
              value={wAmount}
              onChange={(e) => setWAmount(Number(e.target.value || 0))}
            />
            <Button onClick={handleCreateWallet} disabled={savingWallet}>
              {savingWallet ? 'Saving…' : 'Add Wallet'}
            </Button>
          </div>

          {/* quick glance */}
          <div className="mt-4 text-sm text-[var(--muted)]">
            Your wallets:{' '}
            {wallets.length
              ? wallets.map((w) => w.icon_name ?? '💼').join(' ')
              : '—'}
          </div>
        </Card>

        {/* Create Category Group */}
        <CategoryGroupForm userId={session.user.id} onCreated={refresh} />

        {/* Create Category */}
        <CategoryForm groups={groups} onCreated={refresh} />
      </div>

      {/* Add Transaction */}
      <TransactionForm
        wallets={wallets}
        categories={categories}
        onCreated={refresh}
      />

      {/* Recent Transactions */}
      <Card title="Recent Transactions">
        <TransactionList tx={tx} wallets={wallets} categories={categories} />
      </Card>
    </div>
  );
}
