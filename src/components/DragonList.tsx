import { DragonCard } from './DragonCard';

export const DragonList = ({ dragons }: { dragons: any[] }) => { return (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
{dragons.map((dragon: any) => (
<DragonCard key={dragon.name} dragon={dragon} />
))}
</div>
 );
};// aqui lo de tin de tailwind 