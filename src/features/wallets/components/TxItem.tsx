// src/features/wallets/components/TxItem.tsx
import type { TxRow } from "@shared/types";

function fmt(n: number) {
  const s = Math.abs(n).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${n < 0 ? "-" : ""}${s}đ`;
}
function dateVN(iso: string) {
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}/${d.getFullYear()}`;
}

export default function TxItem({ row }: { row: TxRow }) {
  const isNeg = row.amount < 0;
  const catName = row.category?.name ?? "Khác";
  const walletName = row.wallet?.name;

  return (
    <div className="flex items-center justify-between gap-3 border-b p-3 last:border-b-0">
      <div className="flex items-center gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-yellow-300">🥚</span>
        <div className="min-w-0">
          <div className="truncate font-semibold text-gray-900">{catName}</div>
          <div className="truncate text-sm text-gray-500">{row.note ?? "Không có mô tả"}</div>
        </div>
      </div>
      <div className="text-right">
        <div className={`font-semibold ${isNeg ? "text-red-600" : "text-emerald-600"}`}>{fmt(row.amount)}</div>
        <div className="mt-0.5 flex items-center justify-end gap-2 text-xs text-gray-500">
          {walletName && (
            <span className="rounded-md bg-emerald-700/10 px-2 py-0.5 font-medium text-emerald-800">
              {walletName}
            </span>
          )}
          <span>{dateVN(row.created_at)}</span>
        </div>
      </div>
    </div>
  );
}
