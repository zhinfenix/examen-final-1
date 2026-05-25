import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

export const DragonCard = ({ dragon }: { dragon: any }) => {
const { isFavorite, addFavorite, removeFavorite } = useFavorites();
const favorite = isFavorite(dragon.name);

const toggleFavorite = () => { if (favorite) {
removeFavorite(dragon.name);
} else {
addFavorite(dragon);
}
};

return (
<div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center relative transition transform hover:-translate-y-1">
<button onClick={toggleFavorite} className="absolute top-4 right-4 text-3xl text-red-500 focus:outline-none">
<i className={favorite ? "fas fa-heart" : "far fa-heart"}></i>
</button>
            
<img src={dragon.image} alt={dragon.name} className="w-40 h-40 object-contain mb-4" />
            
<Link to={`/dragon/${dragon.name}`} className="text-2xl font-bold capitalize text-gray-800 hover:text-blue-600 mb-3">
{dragon.name}
</Link>
            
<div className="flex gap-2">
{dragon.types.map((type: string) => (
<span key={type} className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-sm font-medium capitalize text-gray-600">
{type}
</span>
))}
</div>
</div>
);
};
