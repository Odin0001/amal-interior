-- Run this once in the Supabase SQL editor (Project -> SQL Editor -> New query).
-- Re-running is safe: every statement is guarded with "if not exists" / exception handling.

do $$ begin
  create type project_category as enum ('residential', 'commercial', 'governmental');
exception
  when duplicate_object then null;
end $$;

-- Categories were narrowed from 4 (residential/hospitality/commercial/cultural) to 3
-- (residential/commercial/governmental). Postgres can't drop enum values, so on an
-- existing install this just adds the new value — 'hospitality' and 'cultural' remain
-- defined-but-unused on the type; the app never selects them once no rows reference them.
alter type project_category add value if not exists 'governmental';

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  category project_category not null,
  title_en text not null,
  title_ar text not null,
  location_en text not null,
  location_ar text not null,
  year text not null,
  description_en text not null default '',
  description_ar text not null default '',
  cover_image_url text not null,
  sort_order integer not null default 0,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

alter table projects add column if not exists featured boolean not null default false;

create table if not exists project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  image_url text not null,
  sort_order integer not null default 0
);

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category project_category not null,
  logo_url text, -- nullable: legacy/seeded clients may not have a logo uploaded yet
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists awards (
  id uuid primary key default gen_random_uuid(),
  year text not null,
  title_en text not null,
  title_ar text not null,
  org_en text not null,
  org_ar text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists project_images_project_id_idx on project_images(project_id);
create index if not exists projects_category_idx on projects(category);
create index if not exists clients_category_idx on clients(category);
create index if not exists awards_year_idx on awards(year);

-- These tables are only ever accessed by the server using the service_role key
-- (which bypasses RLS), so we leave RLS enabled with no policies to block any
-- accidental client-side/anon access.
alter table projects enable row level security;
alter table project_images enable row level security;
alter table clients enable row level security;
alter table awards enable row level security;

-- Don't forget to also create a public Storage bucket named "media"
-- (Project -> Storage -> New bucket -> name: media, Public bucket: on).
