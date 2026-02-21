import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function SudokuPage() {
    return (
        <div className="max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[70vh]">
            <Card variant="elevated" className="p-8 text-center w-full">
                <h1 className="text-4xl font-black text-primary mb-4">Sudoku</h1>
                <p className="text-foreground/70 mb-8">
                    The core Sudoku generation and validation engine will be implemented in Unit U3.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/puzzles" className="contents">
                        <Button variant="ghost">Back to Puzzles</Button>
                    </Link>
                    <Button variant="primary" disabled>Start 4x4 (Coming Soon)</Button>
                    <Button variant="accent" disabled>Start 6x6 (Coming Soon)</Button>
                </div>
            </Card>
        </div>
    );
}
