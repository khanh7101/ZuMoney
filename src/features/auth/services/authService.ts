// src/services/auth.ts
import { supabase } from '../../../lib/supabaseClient';

export async function loginWithUsername(username: string, password: string) {
  const { data, error } = await supabase.rpc('email_by_username', { p_username: username });
  if (error) throw error;
  const email = (data as string | null) ?? null;
  if (!email) throw new Error('Username không tồn tại');
  const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
  if (authError) throw authError;
}

export async function signUpWithEmailPasswordAndUsername(
  email: string,
  password: string,
  username: string,
  redirectTo?: string
) {
  // username sẽ được đưa vào user_metadata → trigger handle_new_user sẽ tạo profile
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: redirectTo,
      data: { username },
    },
  });
  if (error) throw error;
}
