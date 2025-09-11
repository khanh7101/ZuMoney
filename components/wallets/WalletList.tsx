// components/wallets/WalletList.tsx
import { useWallets } from "../../src/context/WalletsContext";

export default function WalletList() {
  const { wallets } = useWallets();
  return (
    <div className="mt-4 text-sm text-[var(--muted)]">
      Your wallets: {wallets.map((w) => w.icon_name ?? "💼").join(" ") || "—"}
    </div>
  );
}
