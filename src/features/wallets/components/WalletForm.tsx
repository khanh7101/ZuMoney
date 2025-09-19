import { useState } from "react";
import { useAuth } from "@auth/context/AuthContext";
import { createWallet } from "@wallets/services/walletService";

export default function WalletForm({ reload }: { reload: () => Promise<void> }) {
  const { user } = useAuth();
  const [walletName, setWalletName] = useState("");   // <— đổi tên biến
  const [amount, setAmount] = useState<number>(0);
  const [icon, setIcon] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || !user) return;
    setLoading(true);
    try {
      await createWallet({
        user_id: user.id,                 // ok vì service đã hỗ trợ optional user_id
        name: walletName.trim(),          // <— TRUYỀN GIÁ TRỊ STRING
        amount,
        icon_name: icon,
      });
      setWalletName("");                  // reset form sau khi tạo
      setAmount(0);
      setIcon(null);
      await reload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <input
        value={walletName}
        onChange={(e) => setWalletName(e.target.value)}
        placeholder="Tên ví"
        className="w-full rounded-lg border px-3 py-2"
        required
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value || 0))}
        placeholder="Số dư ban đầu"
        className="w-full rounded-lg border px-3 py-2"
      />
      {/* icon picker của bạn ở đây */}
      <button disabled={loading} className="rounded-lg bg-sky-600 px-4 py-2 text-white disabled:opacity-60">
        {loading ? "Đang tạo..." : "Tạo ví"}
      </button>
    </form>
  );
}
