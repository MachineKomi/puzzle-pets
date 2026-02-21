import { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'accent' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', variant = 'primary', size = 'md', ...props }, ref) => {
        const baseStyles = 'inline-flex items-center justify-center rounded-xl font-bold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-focus-ring active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';

        const variants = {
            primary: 'bg-primary text-white hover:bg-primary-hover shadow-md',
            accent: 'bg-accent text-white hover:brightness-110 shadow-md',
            danger: 'bg-danger text-white hover:brightness-110 shadow-md',
            ghost: 'bg-transparent text-foreground hover:bg-black/5 dark:hover:bg-white/10',
        };

        const sizes = {
            sm: 'px-4 py-2 text-sm min-h-[44px]', // 44px minimum for touch targets!
            md: 'px-6 py-3 text-base min-h-[48px]',
            lg: 'px-8 py-4 text-lg min-h-[56px]',
        };

        return (
            <button
                ref={ref}
                className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';
