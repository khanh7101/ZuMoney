// components/wallets/WalletForm.tsx
import { useState } from "react";
import Button from "@ui/Button";
import Card from "@ui/Card";
import { createWallet } from "../services/walletService";
import { useAuth } from "@auth/context/AuthContext";
import { useWallets } from "../context/WalletsContext";

export default function WalletForm() {
  const { user } = useAuth();
  const { reload } = useWallets();
  const [icon, setIcon] = useState("💳");
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!user?.id) return alert("Missing user");
    try {
      setLoading(true);
      await createWallet({ user_id: user.id, icon_name: icon, amount });
      setAmount(0);
      await reload();
    } catch (e: any) {
      alert(e.message ?? "Failed to create wallet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Create Wallet">
      <div className="space-y-3">
        <input
          className="w-full rounded-lg p-2"
          placeholder="Icon (emoji or name)"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
        />
        <input
          type="number"
          className="w-full rounded-lg p-2"
          placeholder="Initial amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value || 0))}
        />
        <Button onClick={submit} disabled={loading}>{loading ? "Saving..." : "Add Wallet"}</Button>
      </div>
    </Card>
  );
}
