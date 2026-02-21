import React, { useEffect } from 'react';
import { Card } from './Card';
import { Button } from './Button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    showCloseButton?: boolean;
}

export const Modal = ({ isOpen, onClose, title, children, showCloseButton = true }: ModalProps) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            window.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            {/* Click outside to close */}
            <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

            <Card variant="elevated" className="relative w-full max-w-md p-6 max-h-[90vh] flex flex-col z-10 animate-in fade-in zoom-in duration-200">
                {title && <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>}

                <div className="overflow-y-auto mb-6">
                    {children}
                </div>

                {showCloseButton && (
                    <div className="mt-auto pt-4 border-t border-black/10 dark:border-white/10 flex justify-end">
                        <Button variant="ghost" onClick={onClose}>
                            Close
                        </Button>
                    </div>
                )}
            </Card>
        </div>
    );
};
