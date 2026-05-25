import { useFavorites } from '../context/FavoritesContext';
import { DragonList } from '../components/DragonList';
import { EmptyState } from '../components/EmptyState';

export const Favorites = () => {
const { favorites } = useFavorites();

return (
<div className="container mx-auto px-4 py-10">
<h1 className="text-4xl font-extrabold mb-10 text-center text-gray-800">
<i className="fas fa-star text-yellow-400 mr-3"></i>
Mis Dragones Favoritos
</h1>{favorites.length === 0 ? (
<EmptyState message="No tienes favoritos aún" />
  ) : (
<DragonList dragons={favorites} />
  )}
   </div>
    );
};