// pages/wallets/index.tsx
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { useAuth } from "@auth/context/AuthContext";
import SettingCard from "@ui/SettingCard";

import TotalAssetCard from "@wallets/components/TotalAssetCard";
import WalletCard from "@wallets/components/WalletCard";
import TxItem from "@wallets/components/TxItem";

import {
  createWallet,
  getDefaultWalletId,
  getRecentTransactions,
  getWallets,
  setDefaultWalletId,
} from "@wallets/services/walletService";

import { LightningIcon } from "@shared/nav/icons";

import type { Wallet, TxRow } from "@shared/types";

export default function WalletsPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [defaultId, setDefaultId] = useState<number | null>(null);
  const [tx, setTx] = useState<TxRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [hideAmount, setHideAmount] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user) return;
    (async () => {
      setLoading(true);
      const [w, d, t] = await Promise.all([
        getWallets(),
        getDefaultWalletId(user.id),
        getRecentTransactions(10),
      ]);
      setWallets(w);
      setDefaultId(d);
      setTx(t);
      setLoading(false);
    })();
  }, [user?.id]);

  const total = useMemo(
    () => wallets.reduce((s, w) => s + (w.amount ?? 0), 0),
    [wallets]
  );

  const onCreateWallet = async () => {
    if (submitting) return;
    const name = prompt("Tên ví mới:");
    if (!name) return;
    setSubmitting(true);
    try {
      await createWallet({ name, amount: 0 });
      setWallets(await getWallets());
    } finally {
      setSubmitting(false);
    }
  };

  const onSetDefault = async (id: number) => {
    if (!user || submitting) return;
    setSubmitting(true);
    try {
      await setDefaultWalletId(user.id, id);
      setDefaultId(id);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="space-y-5 pt-10">
      {/* <h1 className="text-4xl font-semibold text-black">Ví</h1> */}

      {/* Tổng tài sản */}
        <TotalAssetCard
          total={total}
          leftLabel="Thanh toán"
          leftValue={total}
          rightLabel="Theo dõi"
          rightValue={0}
          hideAmount={hideAmount}
          onToggleHide={() => setHideAmount((v) => !v)}
        />

      {/* Hành động nhanh */}
        <div className="grid grid-cols-2 text-center text-[15px] text-black"> 
          <div className="flex flex-col items-center justify-center gap-1">
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-300"
              onClick={onCreateWallet}
              disabled={submitting}
            >
              <span className="text-3xl font-thin leading-none">＋</span>
            </button>
            <span className="text-xs">Tạo ví mới</span>
          </div>

          <button
            type="button"
            onClick={() => alert("Khớp số dư nhanh (coming soon)")}
            className="flex flex-col   items-center justify-center gap-1"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-yellow-300 "><LightningIcon /></span>
            <span className="text-xs">Khớp số dư nhanh</span>
          </button>
        </div>

      {/* Ví thanh toán */}
     <h2 className="text-xl text-black">Ví thanh toán</h2>

      {loading ? (
        // Skeleton ngang
        <div className="-mx-4">
          <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1">
            <div className="h-28 w-64 shrink-0 animate-pulse rounded-2xl bg-white/70" />
            <div className="h-28 w-64 shrink-0 animate-pulse rounded-2xl bg-white/70" />
            <div className="h-28 w-64 shrink-0 animate-pulse rounded-2xl bg-white/70" />
          </div>
        </div>
      ) : wallets.length === 0 ? (
        // Empty state tràn viền
        <div className="-mx-4 px-4">
          <div className="rounded-2xl border border-dashed bg-white p-4 text-center text-gray-500">
            Chưa có ví — hãy tạo ví đầu tiên của bạn
          </div>
        </div>
      ) : (
        // Carousel ngang tràn viền (edge-to-edge)
        <div className="-mx-4">
          <div
            className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1"
            aria-label="Danh sách ví"
          >
            {wallets.map((w) => (
              <WalletCard
                key={w.id}
                wallet={w}
                isDefault={defaultId === w.id}
                onSetDefault={() => onSetDefault(w.id)}
                className="w-64 shrink-0 snap-start"  // mỗi card rộng 256px, không co
              />
            ))}
            {/* Spacer nhỏ để card cuối không dính sát mép */}
            <div className="w-2 shrink-0" />
          </div>
        </div>
      )}

      {/* Lịch sử giao dịch */}
      <h2 className="text-2xl text-black">Lịch sử giao dịch</h2>
      <SettingCard>
        <div className="mb-3 flex items-center justify-between">
          <div />
          <Link href="/transactions" className="text-[15px] font-medium text-yellow-700">
            Xem tất cả
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl border bg-white">
          {tx.length === 0 && (
            <div className="p-4 text-center text-gray-500">Chưa có giao dịch</div>
          )}
          {tx.map((r) => (
            <TxItem key={r.id} row={r} />
          ))}
        </div>
      </SettingCard>
    </section>
  );
}
