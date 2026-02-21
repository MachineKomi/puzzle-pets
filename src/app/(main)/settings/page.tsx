'use client';

import { useSettingsStore } from '@/store/settings';
import { Card } from '@/components/ui/Card';

const ToggleSwitch = ({ label, description, isChecked, onChange }: { label: string, description: string, isChecked: boolean, onChange: () => void }) => (
    <div className="flex items-center justify-between p-4 border-b border-black/5 dark:border-white/5 last:border-0 hover:bg-black/5 dark:hover:bg-white/5 transition-colors rounded-xl">
        <div>
            <h3 className="font-bold text-lg">{label}</h3>
            <p className="text-sm text-foreground/70">{description}</p>
        </div>
        <button
            role="switch"
            aria-checked={isChecked}
            onClick={onChange}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-focus-ring ${isChecked ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}
        >
            <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 ${isChecked ? 'translate-x-7' : 'translate-x-1'}`} />
        </button>
    </div>
);

export default function SettingsPage() {
    const { theme, sfxEnabled, musicEnabled, reducedMotion, toggleTheme, toggleSfx, toggleMusic, toggleReducedMotion } = useSettingsStore();

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-extrabold mb-8 text-center sm:text-left">Settings</h1>

            <Card variant="panel" className="mb-6 p-2">
                <ToggleSwitch
                    label="Zen Mode"
                    description="Use soothing, calmer pastel colors designed for relaxation."
                    isChecked={theme === 'zen'}
                    onChange={toggleTheme}
                />
                <ToggleSwitch
                    label="Sound Effects"
                    description="Enable UI chimes, match noises, and interactions."
                    isChecked={sfxEnabled}
                    onChange={toggleSfx}
                />
                <ToggleSwitch
                    label="Background Music"
                    description="Enable relaxing music while you puzzle."
                    isChecked={musicEnabled}
                    onChange={toggleMusic}
                />
                <ToggleSwitch
                    label="Reduce Motion"
                    description="Disable zooming and complex CSS animations across the interface."
                    isChecked={reducedMotion}
                    onChange={toggleReducedMotion}
                />
            </Card>

            <div className="text-center text-sm text-foreground/50 mt-8">
                <p>Puzzle Pets MVPaidlc-v1.0</p>
            </div>
        </div>
    );
}
