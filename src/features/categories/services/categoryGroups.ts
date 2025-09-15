import { supabase } from '@lib/supabaseClient';
import type { CategoryGroup } from '@shared/types';

export async function listCategoryGroups(): Promise<CategoryGroup[]> {
  const { data, error } = await supabase.from('category_groups').select('*').order('id', { ascending: true });
  if (error) throw error;
  return (data ?? []) as CategoryGroup[];
}

export async function createCategoryGroup(input: { user_id: string; name: string }) {
  const { error } = await supabase.from('category_groups').insert(input);
  if (error) throw error;
}
