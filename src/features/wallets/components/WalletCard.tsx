// src/features/wallets/components/WalletCard.tsx
import type { Wallet } from "@shared/types";

function fmt(n?: number) {
  if (n === undefined || n === null) return "0đ";
  const s = Math.abs(n).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${n < 0 ? "-" : ""}${s}đ`;
}

export default function WalletCard({
  wallet,
  isDefault,
  onSetDefault,
  className,                 // <— thêm
}: {
  wallet: Wallet;
  isDefault: boolean;
  onSetDefault: () => void;
  className?: string;        // <— thêm
}) {
  return (
    <div className={`relative rounded-lg border bg-white p-4 ${className ?? ""}`}>
      {isDefault && (
        <span className="absolute right-2 top-2 mt-1 mr-1 rounded-md bg-yellow-200 px-2 py-0.5 text-[11px] font-semibold text-yellow-900">
          Mặc định
        </span>
      )}

      <div className="grid h-9 w-9 place-items-center rounded-md bg-green-500 text-white">💳</div>
      <div className="mt-6 flex flex-col">
        <div className="truncate text-[15px] font-medium text-gray-800">{wallet.name}</div>
        <div className="text-base font-semibold text-gray-900">{fmt(wallet.amount)}</div>
      </div>
    </div>
  );
}
