// src/types/index.ts
export type Wallet = {
  id: number;
  user_id: string;
  name: string;                 // <— mới
  amount: number;
  icon_name: string | null;
};

export type CategoryGroup = {
  id: number;
  user_id: string;
  name: string;
};

export type Category = {
  id: number;
  category_group_id: number;
  name: string;                 // <— mới
  allocated_amount: number;
  spent_amount: number;
  target: string | null;
  icon_name: string | null;
};

export type TransactionType = 'income' | 'expense';

export type Tx = {
  id: number;
  amount: number;
  type: TransactionType;
  wallet_id: number;
  category_id: number | null;
  note: string | null;
  created_at: string;
};

// Row cho màn lịch sử giao dịch (join category & wallet)
export type TxRow = {
  id: number;
  amount: number;
  type: TransactionType;
  note: string | null;
  created_at: string;
  category: { id: number; name: string } | null;
  wallet: { id: number; name: string; amount: number; icon_name: string | null } | null;
};
