import { HTMLAttributes, forwardRef } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'panel' | 'elevated';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className = '', variant = 'panel', ...props }, ref) => {
        const baseStyles = 'rounded-2xl bg-panel text-foreground overflow-hidden';

        const variants = {
            panel: 'shadow-sm border border-black/5 dark:border-white/10',
            elevated: 'shadow-xl border border-black/10 dark:border-white/20',
        };

        return (
            <div
                ref={ref}
                className={`${baseStyles} ${variants[variant]} ${className}`}
                {...props}
            />
        );
    }
);
Card.displayName = 'Card';
