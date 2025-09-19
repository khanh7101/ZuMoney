// src/features/wallets/services/walletService.ts
import { supabase } from "@lib/supabaseClient";
import type { Wallet, TxRow } from "@shared/types";

// export async function getWallets(): Promise<Wallet[]> {
//   const { data, error } = await supabase
//     .from("wallets")
//     .select("id,user_id,name,amount,icon_name")   // <— có name
//     .order("id", { ascending: true });
//   if (error) throw error;
//   return (data as Wallet[]) ?? [];
// }

// // profiles.user_id là khóa tới auth.users.id
// export async function getDefaultWalletId(userId: string): Promise<number | null> {
//   const { data, error } = await supabase
//     .from("profiles")
//     .select("default_wallet_id")
//     .eq("user_id", userId)
//     .maybeSingle();
//   if (error) throw error;
//   return (data?.default_wallet_id as number | null) ?? null;
// }

// export async function setDefaultWalletId(userId: string, walletId: number | null) {
//   const { error } = await supabase
//     .from("profiles")
//     .update({ default_wallet_id: walletId })
//     .eq("user_id", userId);
//   if (error) throw error;
// }

// export async function createWallet(input: { name: string; amount?: number; icon_name?: string | null }) {
//   const { error } = await supabase.from("wallets").insert({
//     name: input.name,                           // <— có name
//     amount: input.amount ?? 0,
//     icon_name: input.icon_name ?? null,
//   });
//   if (error) throw error;
// }

// export async function getRecentTransactions(limit = 10): Promise<TxRow[]> {
//   const { data, error } = await supabase
//     .from("transactions")
//     .select(
//       "id,amount,type,note,created_at," +
//       "category:categories(id,name)," +               // <— có name
//       "wallet:wallets(id,name,amount,icon_name)"      // <— có name
//     )
//     .order("created_at", { ascending: false })
//     .limit(limit);
//   if (error) throw error;
//   return (data as unknown as TxRow[]) ?? [];
// }

// // Dùng đúng cột hiện có: id, user_id, amount, icon_name, name
// export async function listWallets(): Promise<Wallet[]> {
//   const { data, error } = await supabase.from('wallets').select('*').order('id', { ascending: true });
//   if (error) throw error;
//   return (data ?? []) as Wallet[];
// }


// Lấy ví
export async function getWallets(): Promise<Wallet[]> {
  const { data, error } = await supabase
    .from("wallets")
    .select("id,user_id,name,amount,icon_name")
    .order("id", { ascending: true });
  if (error) throw error;
  return (data as Wallet[]) ?? [];
}

// Default wallet id (profiles.default_wallet_id)
export async function getDefaultWalletId(userId: string): Promise<number | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("default_wallet_id")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw error;
  return (data?.default_wallet_id as number | null) ?? null;
}

export async function setDefaultWalletId(userId: string, walletId: number | null) {
  const { error } = await supabase
    .from("profiles")
    .update({ default_wallet_id: walletId })
    .eq("user_id", userId);
  if (error) throw error;
}

// Tạo ví — CHO PHÉP truyền user_id (đúng cách bạn gọi trong WalletForm)
export async function createWallet(input: {
  name: string;
  amount?: number;
  icon_name?: string | null;
  user_id?: string; // optional: nếu không truyền, DB có thể default = auth.uid()
}) {
  const { error } = await supabase.from("wallets").insert({
    name: input.name,
    amount: input.amount ?? 0,
    icon_name: input.icon_name ?? null,
    ...(input.user_id ? { user_id: input.user_id } : {}),
  });
  if (error) throw error;
}

// Lịch sử giao dịch (join name từ categories & wallets)
export async function getRecentTransactions(limit = 10): Promise<TxRow[]> {
  const { data, error } = await supabase
    .from("transactions")
    .select(
      "id,amount,type,note,created_at," +
      "category:categories(id,name)," +
      "wallet:wallets(id,name,amount,icon_name)"
    )
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data as unknown as TxRow[]) ?? [];
}