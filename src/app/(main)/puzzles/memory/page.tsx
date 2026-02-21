import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function MemoryMatchPage() {
    return (
        <div className="max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[70vh]">
            <Card variant="elevated" className="p-8 text-center w-full">
                <h1 className="text-4xl font-black text-accent mb-4">Memory Match</h1>
                <p className="text-foreground/70 mb-8">
                    The memory card flip matching logic will be implemented in Unit U3.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/puzzles" className="contents">
                        <Button variant="ghost">Back to Puzzles</Button>
                    </Link>
                    <Button variant="accent" disabled>Start Game (Coming Soon)</Button>
                </div>
            </Card>
        </div>
    );
}
