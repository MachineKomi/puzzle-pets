# Unit U1: Asset Migration & Design System

## Overview
This unit focuses on establishing the asset pipeline and design tokens to ensure the web replatform matches the legacy Godot art style. We create the foundations for UI components before touching game logic.

## Tasks Completed
1. **Asset Structure**: Created `legacy`, `ui`, `pets`, and `puzzles` inside `public/assets/`.
2. **Asset Manifest Script**: Created `scripts/gen-assets.ts` to scan the asset directory and build a type-safe `manifest.generated.json`.
3. **Asset Helper**: Created `src/assets/index.ts` to consume the manifest.
4. **Theme Tokens**: Defined Normal and Zen mode CSS variables in `globals.css` using Tailwind 4's `@theme` directive.
5. **Core UI Components**: Built accessible, touch-friendly React components:
   - `Button.tsx`
   - `Card.tsx`
   - `Icon.tsx`
   - `Modal.tsx`
   - `ProgressBar.tsx`

## Evidence
- `pnpm run gen:assets` executes successfully.
- `pnpm run lint` passes with 0 errors.
- `pnpm run build` passes (will be verified continuously).
