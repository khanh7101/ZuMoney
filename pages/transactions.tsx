import RequireAuth from "../components/auth/RequireAuth";
import { WalletsProvider } from "../src/context/WalletsContext";
import { TransactionsProvider } from "../src/context/TransactionsContext";
import TransactionForm from "../components/transactions/TransactionForm";
import TransactionList from "../components/transactions/TransactionList";

export default function TransactionsPage() {
  return (
    <RequireAuth>
      {/* TransactionsProvider phụ thuộc WalletsProvider */}
      <WalletsProvider>
        <TransactionsProvider>
          <section className="space-y-4">
            <header>
              <h1 className="text-xl font-semibold">Transactions</h1>
              <p className="text-sm text-gray-500">Nhập giao dịch và xem lịch sử.</p>
            </header>

            <TransactionForm />
            <TransactionList />
          </section>
        </TransactionsProvider>
      </WalletsProvider>
    </RequireAuth>
  );
}
