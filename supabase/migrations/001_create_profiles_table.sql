create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  goals json,
  projects json,

  constraint username_length check (char_length(username) >= 3)
);