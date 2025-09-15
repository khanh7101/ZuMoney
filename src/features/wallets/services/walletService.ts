import { supabase } from '@lib/supabaseClient';
import type { Wallet } from '@shared/types';

export async function listWallets(): Promise<Wallet[]> {
  const { data, error } = await supabase.from('wallets').select('*').order('id', { ascending: true });
  if (error) throw error;
  return (data ?? []) as Wallet[];
}

export async function createWallet(input: { user_id: string; icon_name?: string | null; amount: number }) {
  const { error } = await supabase.from('wallets').insert({
    user_id: input.user_id,
    icon_name: input.icon_name ?? null,
    amount: input.amount,     // dùng amount
  });
  if (error) throw error;
}
