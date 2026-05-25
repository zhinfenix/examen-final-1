const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export const fetchDragons = async () => {
    try {
        const response = await fetch(`${BASE_URL}?limit=30`);
        if (!response.ok) throw new Error('Errorsete al carga');
        
        const data = await response.json();
        
        const detailedDragonsPromises = data.results.map(async (dragon: any) => {
            const detailResponse = await fetch(dragon.url);
            const detailData = await detailResponse.json();
            
            return {
                name: detailData.name,
                image: detailData.sprites.other['official-artwork'].front_default,
                types: detailData.types.map((t: any) => t.type.name),
                id: detailData.id
            };
        });

        const dragonsWithDetails = await Promise.all(detailedDragonsPromises);
        return dragonsWithDetails;
    } catch (error) {
        throw error;
    }
};

export const fetchDragonDetail = async (name: string | undefined) => {
    if (!name) return null;
    try {
        const response = await fetch(`${BASE_URL}/${name}`);
        if (!response.ok) throw new Error('No encontrado');
        
        const data = await response.json();
        
        const stats = {
            hp: data.stats.find((s: any) => s.stat.name === 'hp').base_stat,
            attack: data.stats.find((s: any) => s.stat.name === 'attack').base_stat,
            defense: data.stats.find((s: any) => s.stat.name === 'defense').base_stat,
        };

        return {
            name: data.name,
            image: data.sprites.other['official-artwork'].front_default,
            types: data.types.map((t: any) => t.type.name),
            stats: stats,
            id: data.id
        };
    } catch (error) {
        throw error;
    }
};