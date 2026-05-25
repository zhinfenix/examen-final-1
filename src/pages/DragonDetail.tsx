import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchDragonDetail } from '../services/DragonService';
import { Loader } from '../components/Loader';
import { ErrorMessage } from '../components/ErrorMessage';
import { useFavorites } from '../context/FavoritesContext';

export const DragonDetail = () => {
    const { name } = useParams<{ name: string }>();
    const [dragon, setDragon] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();

    useEffect(() => {
        const loadDetail = async () => {
            try {
                const data = await fetchDragonDetail(name);
                setDragon(data);
                setLoading(false);
            } catch (err) {
                setError("No se pudo cargar el detalle de este dragón");
                setLoading(false);
            }
        };
        loadDetail();
    }, [name]);

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;
    if (!dragon) return null;

    const favorite = isFavorite(dragon.name);

    const toggleFavorite = () => {
        if (favorite) {
            removeFavorite(dragon.name);
        } else {
            addFavorite(dragon);
        }
    };

    return (
        <div className="container mx-auto px-4 py-10 max-w-4xl">
            <Link to="/" className="text-blue-600 font-medium hover:underline mb-8 inline-block">
                &larr; Volver al catálogo principal
            </Link>
            
            <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row gap-10 items-center">
                <div className="w-full md:w-1/2 flex justify-center">
                    <img src={dragon.image} alt={dragon.name} className="w-72 h-72 object-contain" />
                </div>
                
                <div className="w-full md:w-1/2">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-5xl font-extrabold capitalize text-gray-800">{dragon.name}</h1>
                        <button onClick={toggleFavorite} className="text-4xl text-red-500 focus:outline-none">
                            <i className={favorite ? "fas fa-heart" : "far fa-heart"}></i>
                        </button>
                    </div>
                    
                    <div className="flex gap-3 mb-8">
                        {dragon.types.map((type: string) => (
                            <span key={type} className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-lg font-semibold capitalize text-gray-700">
                                {type}
                            </span>
                        ))}
                    </div>
                    
                    <div className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Estadísticas Base</h3>
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-gray-600 font-medium">HP</span> 
                            <span className="text-xl font-bold">{dragon.stats.hp}</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-gray-600 font-medium">Ataque</span> 
                            <span className="text-xl font-bold">{dragon.stats.attack}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-medium">Defensa</span> 
                            <span className="text-xl font-bold">{dragon.stats.defense}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};