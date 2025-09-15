// components/nav/AddTransactionSheet.tsx
import { useEffect } from "react";
import TransactionForm from "../../features/transactions/components/TransactionForm";
import { WalletsProvider } from "../../features/wallets/context/WalletsContext";

export default function AddTransactionSheet({
  open,
  onClose,
}: { open: boolean; onClose: () => void }) {
  // khóa scroll khi mở sheet
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* backdrop */}
      <button
        aria-label="Close"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      {/* sheet */}
      <div
        className="absolute inset-x-0 bottom-0 rounded-t-2xl bg-white p-4 shadow-2xl"
        style={{ paddingBottom: `calc(env(safe-area-inset-bottom,0px) + 16px)` }}
      >
        <div className="mx-auto h-1.5 w-10 rounded-full bg-gray-300" />
        <div className="mt-3">
          {/* Đảm bảo TransactionForm có data ví bằng WalletsProvider */}
          <WalletsProvider>
            <TransactionForm />
          </WalletsProvider>
        </div>
        <div className="mt-3 text-center">
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-gray-500 underline"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
