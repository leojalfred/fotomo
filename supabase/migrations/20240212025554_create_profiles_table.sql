create table public.users (
  id uuid primary key not null references auth.users on delete cascade,
  email text,
  given_name text,
  family_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.users enable row level security;

create policy "Users are viewable by everyone"
  on public.users for select
  using ( true );

create policy "Users can update their own data"
  on public.users for update
  using ( auth.uid() = id );

-- inserts a row into users
create function handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, email, given_name, family_name, avatar_url)
  values (new.id, new.raw_user_meta_data ->> 'email', new.raw_user_meta_data ->> 'given_name', new.raw_user_meta_data ->> 'family_name', new.raw_user_meta_data ->> 'avatar_url');
  return new;
end;
$$;

-- trigger handle_new_user every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();
