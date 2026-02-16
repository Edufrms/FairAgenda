
import React, { useState } from 'react';

const FairSelector = ({ onSelect, fairs, favorites, onToggleFavorite, onAddFair }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newFair, setNewFair] = useState({ name: '', city: '', country: '', date: '' });

  const filteredFairs = fairs.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.city.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    const aFav = favorites.includes(a.id);
    const bFav = favorites.includes(b.id);
    if (aFav && !bFav) return -1;
    if (!aFav && bFav) return 1;
    return 0;
  });

  if (isAdding) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-4">Añadir Feria Manualmente</h2>
        <div className="space-y-4">
          <input 
            type="text" placeholder="Nombre de la Feria" 
            className="w-full p-3 border rounded-lg"
            value={newFair.name} onChange={e => setNewFair({...newFair, name: e.target.value})}
          />
          <div className="grid grid-cols-2 gap-4">
            <input 
              type="text" placeholder="Ciudad" 
              className="w-full p-3 border rounded-lg"
              value={newFair.city} onChange={e => setNewFair({...newFair, city: e.target.value})}
            />
            <input 
              type="text" placeholder="País" 
              className="w-full p-3 border rounded-lg"
              value={newFair.country} onChange={e => setNewFair({...newFair, country: e.target.value})}
            />
          </div>
          <input 
            type="text" placeholder="Fecha (ej: Mayo 2025)" 
            className="w-full p-3 border rounded-lg"
            value={newFair.date} onChange={e => setNewFair({...newFair, date: e.target.value})}
          />
          <div className="flex gap-3 pt-2">
            <button 
              onClick={() => {
                if (newFair.name) {
                  onAddFair(newFair);
                  setIsAdding(false);
                  setNewFair({ name: '', city: '', country: '', date: '' });
                }
              }}
              className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-lg"
            >
              Guardar
            </button>
            <button 
              onClick={() => setIsAdding(false)}
              className="flex-1 bg-gray-100 text-gray-600 font-bold py-3 rounded-lg"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mis Ferias</h2>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-blue-600 text-white p-2 rounded-full shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="12 4v16m8-8H4" /></svg>
        </button>
      </div>

      <div className="relative">
        <input 
          type="text" 
          placeholder="Buscar feria por nombre o ciudad..." 
          className="w-full p-4 pl-12 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute left-4 top-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </div>

      <div className="grid gap-4">
        {filteredFairs.map(fair => (
          <div key={fair.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 transition-transform active:scale-[0.98]">
            <div 
              className="flex-1 cursor-pointer"
              onClick={() => onSelect(fair.id)}
            >
              <h3 className="font-bold text-lg">{fair.name}</h3>
              <p className="text-sm text-gray-500">{fair.city}, {fair.country} • {fair.date}</p>
            </div>
            <button 
              onClick={() => onToggleFavorite(fair.id)}
              className={`p-2 rounded-full ${favorites.includes(fair.id) ? 'text-yellow-500' : 'text-gray-300'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={favorites.includes(fair.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FairSelector;
