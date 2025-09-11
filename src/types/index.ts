export type Wallet = {
  id: number;
  user_id: string;
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
