/*
# Create profiles, watched_movies, ratings, and watchlist tables

## Overview
This migration creates the database foundation for personalized MovieMind
features. It sets up user profiles (auto-created on signup) and three
user-owned data tables for tracking watched content, ratings, and watchlist
items. All tables use Row Level Security so users can only access their own data.

## New Tables

### profiles
- `id` (uuid, primary key, references auth.users ON DELETE CASCADE)
- `display_name` (text, nullable — user can set later)
- `avatar_url` (text, nullable — user can set later)
- `created_at` (timestamptz, default now())
- `updated_at` (timestamptz, default now())

### watched_movies
- `id` (uuid, primary key)
- `user_id` (uuid, not null, references auth.users ON DELETE CASCADE, defaults to auth.uid())
- `tmdb_id` (integer, not null — The Movie Database ID)
- `media_type` (text, not null — 'movie' or 'tv')
- `watched_at` (timestamptz, default now())
- Unique constraint on (user_id, tmdb_id, media_type) to prevent duplicates

### ratings
- `id` (uuid, primary key)
- `user_id` (uuid, not null, references auth.users ON DELETE CASCADE, defaults to auth.uid())
- `tmdb_id` (integer, not null)
- `media_type` (text, not null — 'movie' or 'tv')
- `rating` (integer, not null, CHECK 1–5)
- `created_at` (timestamptz, default now())
- `updated_at` (timestamptz, default now())
- Unique constraint on (user_id, tmdb_id, media_type)

### watchlist
- `id` (uuid, primary key)
- `user_id` (uuid, not null, references auth.users ON DELETE CASCADE, defaults to auth.uid())
- `tmdb_id` (integer, not null)
- `media_type` (text, not null — 'movie' or 'tv')
- `added_at` (timestamptz, default now())
- Unique constraint on (user_id, tmdb_id, media_type)

## Security
- RLS enabled on ALL four tables.
- profiles: users can SELECT and UPDATE only their own profile row (id = auth.uid()).
  No INSERT or DELETE via RLS — profiles are created by the trigger function.
- watched_movies, ratings, watchlist: full owner-scoped CRUD (SELECT, INSERT,
  UPDATE, DELETE) restricted to authenticated users where user_id = auth.uid().
- user_id columns default to auth.uid() so client-side inserts that omit user_id
  still satisfy the WITH CHECK policy.

## Automation
- `handle_new_user()` trigger function: automatically creates a profile row when
  a new auth.users row is inserted (i.e. on signup). Uses display_name from
  user_metadata if available.
- Trigger `on_auth_user_created` fires AFTER INSERT on auth.users for each row.
*/

-- ===== profiles =====
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_profile" ON profiles;
CREATE POLICY "select_own_profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ===== watched_movies =====
CREATE TABLE IF NOT EXISTS watched_movies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  tmdb_id integer NOT NULL,
  media_type text NOT NULL CHECK (media_type IN ('movie', 'tv')),
  watched_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, tmdb_id, media_type)
);

ALTER TABLE watched_movies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_watched" ON watched_movies;
CREATE POLICY "select_own_watched"
  ON watched_movies FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_watched" ON watched_movies;
CREATE POLICY "insert_own_watched"
  ON watched_movies FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_watched" ON watched_movies;
CREATE POLICY "update_own_watched"
  ON watched_movies FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_watched" ON watched_movies;
CREATE POLICY "delete_own_watched"
  ON watched_movies FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ===== ratings =====
CREATE TABLE IF NOT EXISTS ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  tmdb_id integer NOT NULL,
  media_type text NOT NULL CHECK (media_type IN ('movie', 'tv')),
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, tmdb_id, media_type)
);

ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_ratings" ON ratings;
CREATE POLICY "select_own_ratings"
  ON ratings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_ratings" ON ratings;
CREATE POLICY "insert_own_ratings"
  ON ratings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_ratings" ON ratings;
CREATE POLICY "update_own_ratings"
  ON ratings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_ratings" ON ratings;
CREATE POLICY "delete_own_ratings"
  ON ratings FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ===== watchlist =====
CREATE TABLE IF NOT EXISTS watchlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  tmdb_id integer NOT NULL,
  media_type text NOT NULL CHECK (media_type IN ('movie', 'tv')),
  added_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, tmdb_id, media_type)
);

ALTER TABLE watchlist ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_watchlist" ON watchlist;
CREATE POLICY "select_own_watchlist"
  ON watchlist FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_watchlist" ON watchlist;
CREATE POLICY "insert_own_watchlist"
  ON watchlist FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_watchlist" ON watchlist;
CREATE POLICY "update_own_watchlist"
  ON watchlist FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_watchlist" ON watchlist;
CREATE POLICY "delete_own_watchlist"
  ON watchlist FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ===== Indexes =====
CREATE INDEX IF NOT EXISTS idx_watched_movies_user_id ON watched_movies(user_id);
CREATE INDEX IF NOT EXISTS idx_ratings_user_id ON ratings(user_id);
CREATE INDEX IF NOT EXISTS idx_watchlist_user_id ON watchlist(user_id);

-- ===== Auto-create profile on signup =====
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data->>'display_name',
      split_part(NEW.email, '@', 1)
    )
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
