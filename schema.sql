-- ==============================================================================
-- NEO GEN INNOVATORS - SUPABASE DATABASE SCHEMA
-- IoT Hackathon Community founded by Raushan Kumar
-- 3D Interactive Room Walkthrough & Wall Exhibits System
-- ==============================================================================

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";

-- 2. PROFILES TABLE (Linked with Supabase auth.users)
create table if not exists public.profiles (
    id uuid references auth.users on delete cascade primary key,
    email text unique not null,
    full_name text not null,
    role text not null default 'member' check (role in ('admin', 'core', 'mentor', 'member')),
    title text default 'IoT Innovator',
    bio text default 'Passionate about embedded systems, edge computing, and connected hardware.',
    avatar_url text default 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    github_url text default '',
    linkedin_url text default '',
    twitter_url text default '',
    skills text[] default array['Embedded C', 'IoT', 'ESP32', 'Robotics'],
    is_approved boolean default false,
    created_at timestamptz default timezone('utc'::text, now()) not null,
    updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- Indexing for performance
create index if not exists idx_profiles_approved on public.profiles (is_approved);
create index if not exists idx_profiles_role on public.profiles (role);

-- 3. SITE CONTENT TABLE (Dynamic website & 3D Wall copy managed by Admin)
create table if not exists public.site_content (
    id text primary key,
    section text not null,
    content_key text not null unique,
    content_value text not null,
    description text,
    updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- Indexing
create index if not exists idx_site_content_section on public.site_content (section);

-- 4. ROW LEVEL SECURITY (RLS) POLICIES
alter table public.profiles enable row level security;
alter table public.site_content enable row level security;

-- Helper function to check if requesting user is an Admin
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
end;
$$ language plpgsql security definer;

-- PROFILES POLICIES
-- A. Public can view approved members
create policy "Public can view approved profiles"
on public.profiles for select
using (is_approved = true);

-- B. Authenticated users can view their own profile even if not approved
create policy "Users can view own profile"
on public.profiles for select
using (auth.uid() = id);

-- C. Admins can view ALL profiles (pending and approved)
create policy "Admins can view all profiles"
on public.profiles for select
using (public.is_admin());

-- D. Authenticated users can update their own profile (cannot escalate role or approve self)
create policy "Users can update own profile"
on public.profiles for update
using (auth.uid() = id)
with check (
    auth.uid() = id
    and (
      (role = (select role from public.profiles where id = auth.uid()) and is_approved = (select is_approved from public.profiles where id = auth.uid()))
      or public.is_admin()
    )
);

-- E. Admins can insert, update, or delete any profile
create policy "Admins can update any profile"
on public.profiles for update
using (public.is_admin());

create policy "Admins can delete any profile"
on public.profiles for delete
using (public.is_admin());

-- SITE CONTENT POLICIES
-- A. Public can read all site & wall content
create policy "Public can read site content"
on public.site_content for select
using (true);

-- B. Only admins can insert, update, or delete site content
create policy "Admins can insert site content"
on public.site_content for insert
with check (public.is_admin());

create policy "Admins can update site content"
on public.site_content for update
using (public.is_admin())
with check (public.is_admin());

create policy "Admins can delete site content"
on public.site_content for delete
using (public.is_admin());

-- 5. AUTHENTICATION TRIGGER
create or replace function public.handle_new_user()
returns trigger as $$
declare
  is_first_user boolean;
begin
  select not exists (select 1 from public.profiles) into is_first_user;

  insert into public.profiles (
    id,
    email,
    full_name,
    role,
    is_approved,
    title,
    bio,
    avatar_url
  )
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    case when is_first_user then 'admin' else 'member' end,
    case when is_first_user then true else false end,
    case when is_first_user then 'Founder & Admin' else 'IoT Innovator' end,
    'Excited to build smart connected hardware with Neo Gen Innovators.',
    coalesce(new.raw_user_meta_data->>'avatar_url', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80')
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Automatically update timestamp on profile update
create or replace function public.set_current_timestamp_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

drop trigger if exists update_profiles_timestamp on public.profiles;
create trigger update_profiles_timestamp
  before update on public.profiles
  for each row execute function public.set_current_timestamp_updated_at();

-- 6. DEFAULT SEED DATA FOR 3D ROOM WALLS & WEBSITE
insert into public.site_content (id, section, content_key, content_value, description)
values
  -- WALL 1: ENTRANCE HERO
  ('w1_badge', 'wall_1', 'wall1_badge', 'CHAPTER 00 • SYSTEM INITIALIZED', 'Wall 1 Top Badge'),
  ('w1_title', 'wall_1', 'wall1_title', 'NEO GEN INNOVATORS', 'Wall 1 Main Title'),
  ('w1_subtitle', 'wall_1', 'wall1_subtitle', 'An elite physical computing and IoT hackathon collective founded by Raushan Kumar. Walk through our virtual laboratory corridor.', 'Wall 1 Subtitle'),
  ('w1_cta1', 'wall_1', 'wall1_cta1', 'Step Into The Lab', 'Wall 1 Primary CTA'),
  ('w1_cta2', 'wall_1', 'wall1_cta2', 'Member Portal', 'Wall 1 Secondary CTA'),
  ('w1_img', 'wall_1', 'wall1_img', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80', 'Wall 1 Background Artwork'),

  -- WALL 2: GENESIS & VISION (Raushan Kumar)
  ('w2_chapter', 'wall_2', 'wall2_chapter', 'CHAPTER 01', 'Wall 2 Chapter Label'),
  ('w2_title', 'wall_2', 'wall2_title', 'THE SILICON GENESIS', 'Wall 2 Title'),
  ('w2_founder', 'wall_2', 'wall2_founder', 'Raushan Kumar', 'Founder Name'),
  ('w2_quote', 'wall_2', 'wall2_quote', '"True innovation begins when sensors, microcontrollers, and neural networks collaborate in the physical world to solve human-scale challenges."', 'Founder Quote'),
  ('w2_body1', 'wall_2', 'wall2_body1', 'Founded by Raushan Kumar, Neo Gen Innovators was created to accelerate hands-on hardware prototyping and edge compute engineering across collegiate hackathon ecosystems.', 'Wall 2 Paragraph 1'),
  ('w2_body2', 'wall_2', 'wall2_body2', 'We bridge the gap between software algorithms and physical silicon: turning 48-hour sprints into real-world deployed cyber-physical systems.', 'Wall 2 Paragraph 2'),
  ('w2_img', 'wall_2', 'wall2_img', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80', 'Wall 2 Artwork'),

  -- WALL 3: ARCHITECTURAL TESTBENCH
  ('w3_chapter', 'wall_3', 'wall3_chapter', 'CHAPTER 02', 'Wall 3 Chapter Label'),
  ('w3_title', 'wall_3', 'wall3_title', 'THE HARDWARE TESTBENCH', 'Wall 3 Title'),
  ('w3_subtitle', 'wall_3', 'wall3_subtitle', 'Four foundational pillars powering our high-speed IoT hackathon engineering cohorts.', 'Wall 3 Subtitle'),
  ('w3_p1_t', 'wall_3', 'wall3_p1_title', 'Embedded Edge AI', 'Pillar 1 Title'),
  ('w3_p1_d', 'wall_3', 'wall3_p1_desc', 'Quantized 8-bit TinyML models on ARM Cortex-M silicon for edge acoustics & vibration.', 'Pillar 1 Desc'),
  ('w3_p2_t', 'wall_3', 'wall3_p2_title', 'Sub-GHz Mesh', 'Pillar 2 Title'),
  ('w3_p2_d', 'wall_3', 'wall3_p2_desc', 'Resilient telemetry using LoRaWAN, BLE Mesh, and ESP-NOW operating without internet.', 'Pillar 2 Desc'),
  ('w3_p3_t', 'wall_3', 'wall3_p3_title', 'Autonomous Robotics', 'Pillar 3 Title'),
  ('w3_p3_d', 'wall_3', 'wall3_p3_desc', 'ROS 2 micro-architectures with LiDAR SLAM and stereoscopic vision odometry.', 'Pillar 3 Desc'),
  ('w3_p4_t', 'wall_3', 'wall3_p4_title', 'Zero-Trust Silicon', 'Pillar 4 Title'),
  ('w3_p4_d', 'wall_3', 'wall3_p4_desc', 'Hardware secure elements, tamper-resistant bootloaders, and encrypted mTLS pipelines.', 'Pillar 4 Desc'),
  ('w3_img', 'wall_3', 'wall3_img', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80', 'Wall 3 Artwork'),

  -- WALL 4: THE VERIFIED COLLECTIVE
  ('w4_chapter', 'wall_4', 'wall4_chapter', 'CHAPTER 03', 'Wall 4 Chapter Label'),
  ('w4_title', 'wall_4', 'wall4_title', 'THE VERIFIED COLLECTIVE', 'Wall 4 Title'),
  ('w4_subtitle', 'wall_4', 'wall4_subtitle', 'Approved hardware engineers, firmware researchers, and creators active in our sprints.', 'Wall 4 Subtitle'),
  ('w4_img', 'wall_4', 'wall4_img', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80', 'Wall 4 Artwork'),

  -- WALL 5: HACKATHON WAR ROOM & STATS
  ('w5_chapter', 'wall_5', 'wall5_chapter', 'CHAPTER 04', 'Wall 5 Chapter Label'),
  ('w5_title', 'wall_5', 'wall5_title', 'HACKATHON WAR ROOM', 'Wall 5 Title'),
  ('w5_subtitle', 'wall_5', 'wall5_subtitle', 'Numbers forged through sleepless hackathon sprints and high-precision physical hardware.', 'Wall 5 Subtitle'),
  ('w5_s1', 'wall_5', 'stat_members', '500+', 'Active Hackers & Builders'),
  ('w5_s2', 'wall_5', 'stat_hackathons', '18', 'Hackathons Won'),
  ('w5_s3', 'wall_5', 'stat_prototypes', '120+', 'IoT Prototypes Built'),
  ('w5_s4', 'wall_5', 'stat_grants', '$85K+', 'Ecosystem Bounties & Hardware Grants'),
  ('w5_img', 'wall_5', 'wall5_img', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80', 'Wall 5 Artwork')
on conflict (content_key) do update
set content_value = excluded.content_value;
