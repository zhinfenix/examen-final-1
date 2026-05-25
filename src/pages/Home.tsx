import { useState, useEffect } from 'react';
import { fetchDragons } from '../services/DragonService';
import { Loader } from '../components/Loader';
import { ErrorMessage } from '../components/ErrorMessage';
import { EmptyState } from '../components/EmptyState';
import { SearchBar } from '../components/SearchBar';
import { DragonList } from '../components/DragonList';

export const Home = () => {
    const [dragons, setDragons] = useState<any[]>([]);
    const [filteredDragons, setFilteredDragons] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadDragons = async () => {
            try {
                const data = await fetchDragons();
                setDragons(data);
                setFilteredDragons(data);
                setLoading(false);
            } catch (err) {
                setError("Hubo un problema al cargar el catálogo de dragones");
                setLoading(false);
            }
        };
        loadDragons();
    }, []);

    const handleSearch = (term: string) => {
        const filtered = dragons.filter(dragon => 
            dragon.name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredDragons(filtered);
    };

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="container mx-auto px-4 py-8">
            <SearchBar onSearch={handleSearch} />
            {filteredDragons.length === 0 ? (
                <EmptyState message="No se encontraron dragones con ese nombre" />
            ) : (
                <DragonList dragons={filteredDragons} />
            )}
        </div>
    );
}