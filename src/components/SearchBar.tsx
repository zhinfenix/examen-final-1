import { useState } from 'react';

export const SearchBar = ({ onSearch }: { onSearch: (term: string) => void }) => {
const [search, setSearch] = useState("");

const handleChange = (e: any) => {
setSearch(e.target.value);
onSearch(e.target.value);
    };

return (
<div className="relative mb-8 max-w-lg mx-auto"> <i className="fas fa-search absolute left-4 top-3 text-gray-700 text-lg"></i>
<input
type="text"
value={search}
onChange={handleChange}
placeholder="Buscar dragones por nombre"
className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:border-blue-500"
/>
</div>
);
};