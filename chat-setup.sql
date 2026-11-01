-- Jalankan di Supabase: SQL Editor -> New query -> tempel -> Run
create table messages (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 40),
  message text not null check (char_length(message) between 1 and 300),
  created_at timestamptz default now()
);
alter table messages enable row level security;
create policy "anyone can read" on messages for select using (true);
create policy "anyone can write" on messages for insert with check (true);
