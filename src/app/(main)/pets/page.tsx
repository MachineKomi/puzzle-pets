import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';

export default function PetsPage() {
    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-extrabold mb-8 text-center sm:text-left">Pet Arena</h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {/* Placeholder Pet Grid */}
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <Card key={i} variant="panel" className="aspect-square flex flex-col items-center justify-center opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                        <Icon assetKey="pets/cat" size="xl" />
                        <span className="mt-4 font-bold text-sm">Locked</span>
                    </Card>
                ))}
            </div>
        </div>
    );
}
