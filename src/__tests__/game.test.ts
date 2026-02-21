import { describe, it, expect, beforeEach } from 'vitest';
import { useGameStore } from '@/store/game';
import { saveStorage } from '@/lib/storage';

// Wait for debounced saves
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

describe('Game Store & Persistence', () => {
    beforeEach(async () => {
        // Fresh store reset before each test
        await saveStorage.clearSave();
        const store = useGameStore.getState();
        await store.resetSaveData();
    });

    it('initializes with a fresh profile if no save exists', async () => {
        const store = useGameStore.getState();
        expect(store.isLoaded).toBe(true);
        expect(store.profile.id).toBeTruthy(); // UUID generated
        expect(store.wallet.coins).toBe(0);
        expect(store.pets.level).toBe(1);
        expect(store.pets.xp).toBe(0);
    });

    it('adds coins and debounces save to IndexedDB', async () => {
        const store = useGameStore.getState();
        store.addCoins(100);
        store.addCoins(50);

        // State updates immediately
        expect(useGameStore.getState().wallet.coins).toBe(150);

        // Wait for the 1000ms debounce
        await delay(1100);

        // Verify it was pushed to storage mock
        const saved = await saveStorage.getSave();
        expect(saved?.wallet.coins).toBe(150);
    });

    it('handles XP gain and level ups automatically', () => {
        const store = useGameStore.getState();

        // Level 1 -> requires 100 XP to reach Level 2
        store.gainXp(120);

        const updatedStore = useGameStore.getState();
        expect(updatedStore.pets.level).toBe(2);
        expect(updatedStore.pets.xp).toBe(20); // 120 - 100 carryover
    });

    it('records puzzle completion stats accurately', () => {
        const store = useGameStore.getState();

        store.recordPuzzleCompletion('sudoku_4x4', 2, 300);
        expect(useGameStore.getState().puzzles.completedCount).toBe(1);
        expect(useGameStore.getState().puzzles.bestStats['sudoku_4x4']).toEqual({ stars: 2, time: 300 });

        // Faster time, same stars -> should update
        store.recordPuzzleCompletion('sudoku_4x4', 2, 250);
        expect(useGameStore.getState().puzzles.bestStats['sudoku_4x4'].time).toBe(250);

        // More stars, slower time -> should update (stars prioritize)
        store.recordPuzzleCompletion('sudoku_4x4', 3, 500);
        expect(useGameStore.getState().puzzles.bestStats['sudoku_4x4'].stars).toBe(3);
        expect(useGameStore.getState().puzzles.bestStats['sudoku_4x4'].time).toBe(500);
        expect(useGameStore.getState().puzzles.completedCount).toBe(3);
    });

    it('fully resets save data via resetSaveData action', async () => {
        const store = useGameStore.getState();
        store.addCoins(500);
        store.unlockPet('pets/cat');

        await delay(1100); // Flush write

        // Reset it
        await useGameStore.getState().resetSaveData();

        // State should be back to 0
        expect(useGameStore.getState().wallet.coins).toBe(0);
        expect(useGameStore.getState().pets.collection).toHaveLength(0);

        // Physical storage should also be clear
        const saved = await saveStorage.getSave();
        expect(saved?.wallet.coins).toBe(0);
    });
});
