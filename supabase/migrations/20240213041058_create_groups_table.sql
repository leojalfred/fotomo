create table public.groups (
  id uuid primary key not null default gen_random_uuid(),
  name text not null,
  description text,
  private boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.roles (
  id uuid primary key not null default gen_random_uuid(),
  name text not null,
  created_at timestamp with time zone default timezone('utc' :: text, now()) not null,
  updated_at timestamp with time zone default timezone('utc' :: text, now()) not null
);

create table public.group_members (
  group_id uuid not null references public.groups on delete cascade,
  user_id uuid not null references auth.users on delete cascade,
  role_id uuid not null references public.roles on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  primary key (group_id, user_id)
);

alter table public.groups enable row level security;
alter table public.roles enable row level security;
alter table public.group_members enable row level security;

insert into public.roles (name) values ('admin'), ('contributor'), ('viewer');

create schema private;

create function private.get_groups_for_authenticated_user(role_name text)
returns setof uuid
language plpgsql
security definer set search_path = public
stable
as $$
begin
  return query
  select gm.group_id
  from public.group_members gm
  join public.roles r on gm.role_id = r.id
  where gm.user_id = auth.uid() and r.name = role_name;
end;
$$;

create policy "Admins can manage their groups"
  on public.groups
  for all using (
    id in (
      select private.get_groups_for_authenticated_user('admin')
    )
  );

create policy "Contributors can access their groups"
  on public.groups
  for select using (
    id in (
      select private.get_groups_for_authenticated_user('contributor')
    )
  );

create policy "Viewers can access their groups"
  on public.groups
  for select using (
    id in (
      select private.get_groups_for_authenticated_user('viewer')
    )
  );

create policy "Admins can manage group members for their groups"
  on public.group_members
  for all using (
    group_id in (
      select private.get_groups_for_authenticated_user('admin')
    )
  );

create policy "Contributors can view group members in their groups"
  on public.group_members
  for select using (
    group_id in (
      select private.get_groups_for_authenticated_user('contributor')
    )
  );

create policy "Viewers can view group members in their groups"
  on public.group_members
  for select using (
    group_id in (
      select private.get_groups_for_authenticated_user('viewer')
    )
  );
