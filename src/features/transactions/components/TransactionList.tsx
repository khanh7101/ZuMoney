// components/transactions/TransactionList.tsx
import { useEffect, useMemo, useState } from "react";
import type { Category } from "../../../types";
import { useTransactions } from "../context/TransactionsContext";
import { useWallets } from "../../wallets/context/WalletsContext";
import { supabase } from "../../../lib/supabaseClient";

export default function TransactionList() {
  const { tx } = useTransactions();
  const { wallets } = useWallets();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("categories").select("id,target,icon_name");
      setCategories((data ?? []) as Category[]);
    })();
  }, []);

  const walletMap = useMemo(() => {
    const m = new Map<number, typeof wallets[number]>();
    wallets.forEach((w) => m.set(w.id as number, w));
    return m;
  }, [wallets]);

  const catMap = useMemo(() => {
    const m = new Map<number, Category>();
    categories.forEach((c) => m.set(c.id as number, c));
    return m;
  }, [categories]);

  if (!tx.length) return <div className="text-[var(--muted)]">No transactions yet.</div>;

  return (
    <div className="space-y-2">
      {tx.map((row) => {
        const wallet = walletMap.get(row.wallet_id as number);
        const cat = row.category_id ? catMap.get(row.category_id as number) : undefined;
        return (
          <div key={row.id} className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
            <div className="flex items-center gap-3">
              <div className="text-xl">{wallet?.icon_name ?? "💼"}</div>
              <div>
                <div className="text-sm opacity-80">{new Date(row.created_at).toLocaleString()}</div>
                <div className="text-xs opacity-60">
                  {row.type === "expense" ? `${cat?.icon_name ?? ""} ${cat?.target ?? ""}` : "Income"}
                </div>
                <div className="text-xs opacity-60">{row.note ?? ""}</div>
              </div>
            </div>
            <div className={row.type === "expense" ? "text-red-400" : "text-emerald-400"}>
              {row.type === "expense" ? "-" : "+"}
              {row.amount.toLocaleString()}
            </div>
          </div>
        );
      })}
    </div>
  );
}
