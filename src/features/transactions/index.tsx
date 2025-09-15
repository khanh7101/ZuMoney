import RequireAuth from "../auth/components/RequireAuth";
import { WalletsProvider } from "../wallets/context/WalletsContext";
import { TransactionsProvider } from "./context/TransactionsContext";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

export default function TransactionsPage() {
  return (
    <RequireAuth>
      <WalletsProvider>
        <TransactionsProvider>
          <section className="space-y-4">
            <header>
              <h1 className="text-xl font-semibold">Transactions</h1>
              <p className="text-sm text-gray-500">Nhập giao dịch và xem lịch sử.</p>/
            </header>
            <TransactionForm />
            <TransactionList />
          </section>
        </TransactionsProvider>
      </WalletsProvider>
    </RequireAuth>
  );
}
