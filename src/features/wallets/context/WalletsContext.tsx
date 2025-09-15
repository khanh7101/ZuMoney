// src/context/WalletsContext.tsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { supabase } from "@lib/supabaseClient";
import { useAuth } from "@auth/context/AuthContext";
import type { Wallet } from "@shared/types";

type WalletsContextValue = {
  wallets: Wallet[];
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
};

const WalletsContext = createContext<WalletsContextValue | undefined>(undefined);

export function WalletsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const reload = async () => {
    if (!user?.id) {
      setWallets([]);
      setLoading(false);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);

    // ⚠️ Đổi tên bảng/cột filter đúng schema của bạn
    const { data, error } = await supabase
      .from("wallets")
      .select("*")
      .eq("user_id", user.id)
      .order("id", { ascending: true });

    if (error) {
      setError(error.message);
      setWallets([]);
    } else {
      setWallets((data ?? []) as Wallet[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const value = useMemo(() => ({ wallets, loading, error, reload }), [wallets, loading, error]);
  return <WalletsContext.Provider value={value}>{children}</WalletsContext.Provider>;
}

export function useWallets(): WalletsContextValue {
  const ctx = useContext(WalletsContext);
  if (!ctx) throw new Error("useWallets must be used within <WalletsProvider>");
  return ctx;
}
