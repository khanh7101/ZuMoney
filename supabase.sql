create extension if not exists "pgcrypto";
create table if not exists public.categories(
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  type text not null check (type in ('expense','income')),
  created_at timestamptz not null default now()
);
create index if not exists categories_user_idx on public.categories (user_id, type, name);
create table if not exists public.transactions(
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  amount numeric(12,2) not null check (amount >= 0),
  type text not null check (type in ('expense','income')),
  category_id uuid references public.categories(id) on delete set null,
  note text,
  occurred_on date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists transactions_user_date_idx on public.transactions (user_id, occurred_on desc);
create index if not exists transactions_user_type_idx on public.transactions (user_id, type);
create or replace function public.set_updated_at() returns trigger as $$ begin new.updated_at = now(); return new; end; $$ language plpgsql;
drop trigger if exists trg_tx_updated_at on public.transactions;
create trigger trg_tx_updated_at before update on public.transactions for each row execute procedure public.set_updated_at();
alter table public.categories enable row level security;
alter table public.transactions enable row level security;
drop policy if exists "select_own_categories" on public.categories;
create policy "select_own_categories" on public.categories for select using (auth.uid() = user_id);
drop policy if exists "insert_own_categories" on public.categories;
create policy "insert_own_categories" on public.categories for insert with check (auth.uid() = user_id);
drop policy if exists "update_own_categories" on public.categories;
create policy "update_own_categories" on public.categories for update using (auth.uid() = user_id);
drop policy if exists "delete_own_categories" on public.categories;
create policy "delete_own_categories" on public.categories for delete using (auth.uid() = user_id);
drop policy if exists "select_own_transactions" on public.transactions;
create policy "select_own_transactions" on public.transactions for select using (auth.uid() = user_id);
drop policy if exists "insert_own_transactions" on public.transactions;
create policy "insert_own_transactions" on public.transactions for insert with check (auth.uid() = user_id);
drop policy if exists "update_own_transactions" on public.transactions;
create policy "update_own_transactions" on public.transactions for update using (auth.uid() = user_id);
drop policy if exists "delete_own_transactions" on public.transactions;
create policy "delete_own_transactions" on public.transactions for delete using (auth.uid() = user_id);
