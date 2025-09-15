import { supabase } from '@lib/supabaseClient';
import type { Category } from '@shared/types';

export async function listCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from('categories').select('*').order('id', { ascending: true });
  if (error) throw error;
  return (data ?? []) as Category[];
}

export async function createCategory(input: {
  category_group_id: number;
  allocated_amount: number;
  target?: string | null;
  icon_name?: string | null;
}) {
  const { error } = await supabase.from('categories').insert({
    category_group_id: input.category_group_id,
    allocated_amount: input.allocated_amount,
    spent_amount: 0,
    target: input.target ?? null,
    icon_name: input.icon_name ?? null,
  });
  if (error) throw error;
}
