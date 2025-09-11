import RequireAuth from "../components/auth/RequireAuth";
import { WalletsProvider } from "../src/context/WalletsContext";
import WalletForm from "../components/wallets/WalletForm";
import WalletList from "../components/wallets/WalletList";

export default function WalletsPage() {
  return (
    <RequireAuth>
      <WalletsProvider>
        <section className="space-y-4">
          <header>
            <h1 className="text-xl font-semibold">Wallets</h1>
            <p className="text-sm text-gray-500">Quản lý các ví/tài khoản tiền.</p>
          </header>

          <WalletForm />
          <WalletList />
        </section>
      </WalletsProvider>
    </RequireAuth>
  );
}
