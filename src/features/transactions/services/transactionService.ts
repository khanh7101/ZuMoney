import { supabase } from '../../../lib/supabaseClient';
import type { Tx, TransactionType } from '../../../types';

export async function listTransactions(limit = 50): Promise<Tx[]> {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as Tx[];
}

export async function createTransaction(input: {
  amount: number;
  type: TransactionType;
  wallet_id: number;
  category_id?: number | null;
  note?: string | null;
  created_at?: string; // ISO string
}) {
  const payload = {
    amount: input.amount,
    type: input.type,
    wallet_id: input.wallet_id,
    category_id: input.type === 'expense' ? (input.category_id ?? null) : null,
    note: input.note ?? null,
    ...(input.created_at ? { created_at: input.created_at } : {}),
  };
  const { error } = await supabase.from('transactions').insert(payload);
  if (error) throw error;
}
