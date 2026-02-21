import { test, expect } from '@playwright/test';

test('Navigation Smoke Test', async ({ page }) => {
    // 1. Visit Home
    await page.goto('/');
    await expect(page.locator('h1')).toHaveText(/My Pet/i);

    // 2. Visit Puzzles via Nav or Button
    await page.click('text="Play Puzzles"');
    await expect(page).toHaveURL(/\/puzzles/);
    await expect(page.locator('h1')).toHaveText(/Select a Puzzle/i);

    // 3. Visit Settings
    await page.goto('/settings');
    await expect(page.locator('h1')).toHaveText(/Settings/i);

    // 4. Visit Pets
    await page.goto('/pets');
    await expect(page.locator('h1')).toHaveText(/Pet Arena/i);
});
