# Unit U3: Persistence & Migrations (IndexedDB)

## Overview
This unit focuses on managing long-term game progression. It builds an IndexedDB module for stable client-side local saving while mapping the state directly to the React application utilizing Zustand stores. We must ensure saves survive page refreshes and that breaking React hydration via SSR mismatches is avoided.

## Tasks Completed
1. **IndexedDB Wrapper**: Created `src/lib/storage.ts` using `idb` to define the database name, object store, and baseline schema definition (Profile, Wallet, Pets, Puzzles).
2. **Game State Management**: Handled state mutations via `src/store/game.ts` using Zustand. It automatically pushes state slices to the IndexedDB via Lodash `debounce`.
3. **Hydration Wrapping**: Created `ClientHydration.tsx` wrapping the application root. It delays UI rendering until Zustand acknowledges `initLoad()` is fulfilled from the underlying IndexedDB ensuring React doesn't flash empty state SSR errors.
4. **Settings Interactions**: Developed the UI logic into `SettingsPage.tsx` integrating `resetSaveData` allowing the user to start a new game effectively.
5. **Testing Architecture**: Introduced `Vitest` with JS DOM. Stubbed IDB functionality in `setup.ts` to allow rapid headless Node assertions. `game.test.ts` executes a full roundtrip proving all game state transitions are deterministic.

## Evidence
- `pnpm run test` executes `game.test.ts` successfully proving IDB interaction assertions in under a second.
- `pnpm run lint` and `pnpm run build` finish successfully incorporating new strict typing bounds on the Zustand actions.
