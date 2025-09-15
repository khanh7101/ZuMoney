// components/transactions/TransactionForm.tsx
import { useEffect, useState } from "react";
import Button from "@ui/Button";
import Card from "@ui/Card";
import type { Category, TransactionType } from "@shared/types";
import { createTransaction } from "../services/transactionService";
import { useWallets } from "@wallets/context/WalletsContext";
import { supabase } from "@lib/supabaseClient";

function nowLocalForInput() {
  const n = new Date();
  const off = n.getTimezoneOffset() * 60000;
  return new Date(n.getTime() - off).toISOString().slice(0, 16);
}

export default function TransactionForm() {
  const { wallets } = useWallets();
  const [categories, setCategories] = useState<Category[]>([]);
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<TransactionType>("expense");
  const [walletId, setWalletId] = useState<number | "">("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [note, setNote] = useState("");
  const [when, setWhen] = useState(nowLocalForInput());
  const [loading, setLoading] = useState(false);

  // Tải categories (nếu muốn dùng CategoriesContext nâng cấp sau, có thể chuyển sang đó)
  const loadCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("id, target, icon_name")
      .order("id", { ascending: true });
    if (!error) setCategories((data ?? []) as Category[]);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const submit = async () => {
    if (!walletId) return alert("Pick wallet");
    if (type === "expense" && !categoryId) return alert("Category required for expense");

    try {
      setLoading(true);
      await createTransaction({
        amount: Number(amount) || 0,
        type,
        wallet_id: Number(walletId),
        category_id: type === "expense" ? (categoryId as number) : null,
        note: note || null,
        created_at: new Date(when).toISOString(),
      });
      setAmount(0);
      setNote("");
      if (type === "expense") setCategoryId("");
      // tùy chọn: có thể gọi reload từ useTransactions() nếu muốn cập nhật list ngay ở đây
    } catch (e: any) {
      alert(e.message ?? "Failed to create transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Add Transaction">
      <div className="grid items-end gap-3 md:grid-cols-6">
        <input
          type="number"
          className="rounded-lg p-2 md:col-span-1"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value || 0))}
        />

        <select
          className="rounded-lg p-2 md:col-span-1"
          value={type}
          onChange={(e) => setType(e.target.value as TransactionType)}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <select
          className="rounded-lg p-2 md:col-span-1"
          value={walletId}
          onChange={(e) => setWalletId(e.target.value ? Number(e.target.value) : "")}
        >
          <option value="">Wallet</option>
          {wallets.map((w) => (
            <option key={w.id} value={w.id}>
              {w.icon_name ?? "💼"} #{w.id}
            </option>
          ))}
        </select>

        <select
          className="rounded-lg p-2 md:col-span-1"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : "")}
          disabled={type === "income"}
        >
          <option value="">{type === "income" ? "Category (optional)" : "Category (required)"}</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.icon_name ?? "📁"} {c.target ?? "(untitled)"}
            </option>
          ))}
        </select>

        <input
          className="rounded-lg p-2 md:col-span-1"
          placeholder="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <input
          className="rounded-lg p-2 md:col-span-1"
          type="datetime-local"
          value={when}
          onChange={(e) => setWhen(e.target.value)}
        />
      </div>

      <div className="mt-3">
        <Button onClick={submit} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>
    </Card>
  );
}
