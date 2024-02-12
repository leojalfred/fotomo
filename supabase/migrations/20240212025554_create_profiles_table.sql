create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text,
  given_name text,
  family_name text,
  avatar_url text,

  primary key (id)
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on profiles for select
  using ( true );

create policy "Users can insert their own profiles"
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update their own profiles"
  on profiles for update
  using ( auth.uid() = id );

-- inserts a row into public.profiles
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, given_name, family_name, avatar_url)
  values (new.id, new.raw_user_meta_data ->> 'email', new.raw_user_meta_data ->> 'given_name', new.raw_user_meta_data ->> 'family_name', new.raw_user_meta_data ->> 'avatar_url');
  return new;
end;
$$;

-- trigger handle_new_user every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
