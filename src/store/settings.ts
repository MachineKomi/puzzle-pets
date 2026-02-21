import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
    theme: 'normal' | 'zen';
    sfxEnabled: boolean;
    musicEnabled: boolean;
    reducedMotion: boolean;
    toggleTheme: () => void;
    toggleSfx: () => void;
    toggleMusic: () => void;
    toggleReducedMotion: () => void;
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            theme: 'normal',
            sfxEnabled: true,
            musicEnabled: true,
            reducedMotion: false,

            toggleTheme: () => set((state) => ({ theme: state.theme === 'normal' ? 'zen' : 'normal' })),
            toggleSfx: () => set((state) => ({ sfxEnabled: !state.sfxEnabled })),
            toggleMusic: () => set((state) => ({ musicEnabled: !state.musicEnabled })),
            toggleReducedMotion: () => set((state) => ({ reducedMotion: !state.reducedMotion })),
        }),
        {
            name: 'puzzle-pets-settings', // unique name for local storage
        }
    )
);
