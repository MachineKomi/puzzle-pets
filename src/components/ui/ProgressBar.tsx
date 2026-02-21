interface ProgressBarProps {
    progress: number; // 0 to 100
    colorVariant?: 'primary' | 'accent' | 'danger';
    height?: 'sm' | 'md' | 'lg';
    className?: string;
    showLabel?: boolean;
}

export const ProgressBar = ({
    progress,
    colorVariant = 'primary',
    height = 'md',
    className = '',
    showLabel = false,
}: ProgressBarProps) => {
    const safeProgress = Math.min(Math.max(progress, 0), 100);

    const heights = {
        sm: 'h-2',
        md: 'h-4',
        lg: 'h-6',
    };

    const colors = {
        primary: 'bg-primary',
        accent: 'bg-accent',
        danger: 'bg-danger',
    };

    return (
        <div className={`w-full ${className}`}>
            <div className={`w-full bg-black/10 dark:bg-white/10 rounded-full overflow-hidden ${heights[height]}`}>
                <div
                    className={`${colors[colorVariant]} h-full transition-all duration-500 ease-out`}
                    style={{ width: `${safeProgress}%` }}
                />
            </div>
            {showLabel && (
                <p className="text-xs font-bold text-foreground mt-1 text-center">
                    {Math.round(safeProgress)}%
                </p>
            )}
        </div>
    );
};
