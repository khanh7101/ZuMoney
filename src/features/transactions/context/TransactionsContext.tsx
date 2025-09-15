// src/context/TransactionsContext.tsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { supabase } from "@lib/supabaseClient";
import { useWallets } from "@wallets/context/WalletsContext";
import type { Tx } from "@shared/types";

type TransactionsContextValue = {
  tx: Tx[];
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
};

const TransactionsContext = createContext<TransactionsContextValue | undefined>(undefined);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const { wallets } = useWallets();
  const [tx, setTx] = useState<Tx[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const reload = async () => {
    const walletIds = wallets.map((w) => w.id);
    if (!walletIds.length) {
      setTx([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("transactions")
      .select("id, amount, type, wallet_id, category_id, note, created_at")
      .in("wallet_id", walletIds as any) // MySQL numeric; cast any cho TS yên tâm
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
      setTx([]);
    } else {
      setTx((data ?? []) as Tx[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallets.map((w) => w.id).join(",")]);

  const value = useMemo(() => ({ tx, loading, error, reload }), [tx, loading, error]);
  return <TransactionsContext.Provider value={value}>{children}</TransactionsContext.Provider>;
}

export function useTransactions(): TransactionsContextValue {
  const ctx = useContext(TransactionsContext);
  if (!ctx) throw new Error("useTransactions must be used within <TransactionsProvider>");
  return ctx;
}
