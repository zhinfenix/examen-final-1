import { createContext, useState, useContext } from 'react';

export const FavoritesContext = createContext<any>(null);

export const FavoritesProvider = ({ children }: { children: any }) => {
const [favorites, setFavorites] = useState<any[]>([]);

const addFavorite = (dragon: any) => {
if (!favorites.some(fav => fav.name === dragon.name)) {
setFavorites([...favorites, dragon]);
}
};

const removeFavorite = (dragonName: string) => {
setFavorites(favorites.filter(fav => fav.name !== dragonName));
};

const isFavorite = (dragonName: string) => {
return favorites.some(fav => fav.name === dragonName);
};

return ( <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
{children}
</FavoritesContext.Provider>
);
};

export const useFavorites = () => useContext(FavoritesContext);