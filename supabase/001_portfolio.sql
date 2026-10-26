-- Version 1.0.0: dedicated public portfolio content only.
create table public.se_portfolio_content (
  id text primary key check (id = 'main'),
  payload jsonb not null check (jsonb_typeof(payload) = 'object'),
  is_published boolean not null default false,
  updated_at timestamptz not null default now()
);
alter table public.se_portfolio_content enable row level security;
revoke all on public.se_portfolio_content from anon, authenticated;
grant select on public.se_portfolio_content to anon, authenticated;
create policy portfolio_published_read on public.se_portfolio_content
for select to anon, authenticated using (is_published = true);
