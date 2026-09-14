/*
# Add onboarding_completed column to profiles

## Overview
Adds a boolean `onboarding_completed` column to the `profiles` table to track
whether a user has completed the taste-selection onboarding flow. This is set
to `true` only after all onboarding data (watched_movies + ratings) has been
successfully written to the database.

## Changes
- `profiles` table: new column `onboarding_completed` (boolean, default false)
- No security changes needed — existing SELECT/UPDATE policies on profiles
  already cover this column since they are column-agnostic (full row access
  for the owner).

## Notes
1. The column defaults to `false` so all existing profiles are treated as
   not-yet-onboarded.
2. The column is NOT NULL to prevent ambiguous null states.
3. Idempotent: uses a DO block to check if the column exists before adding.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles'
    AND column_name = 'onboarding_completed'
  ) THEN
    ALTER TABLE profiles ADD COLUMN onboarding_completed boolean NOT NULL DEFAULT false;
  END IF;
END $$;
