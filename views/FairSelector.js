
import React, { useState } from 'react';

export default function FairSelector({ fairs, favorites, onSelect, onToggleFavorite, onAddFair }) {
  const [search, setSearch] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFair, setNewFair] = useState({ name: '', city: '', country: '', date: '' });

  const filteredFairs = fairs.filter(f => 
    f.name.toLowerCase().includes(search.toLowerCase()) || 
    f.city.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => {
    const aFav = favorites.includes(a.id);
    const bFav = favorites.includes(b.id);
    if (aFav && !bFav) return -1;
    if (!aFav && bFav) return 1;
    return 0;
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (newFair.name && newFair.city) {
      onAddFair(newFair);
      setNewFair({ name: '', city: '', country: '', date: '' });
      setShowAddForm(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-slate-800 mb-1">Elige una feria</h2>
        <p className="text-slate-500 text-sm">Organiza tu actividad por evento</p>
      </div>

      <div className="relative mb-6">
        <input 
          type="text"
          placeholder="Busca por nombre o ciudad..."
          className="w-full bg-white border border-slate-200 rounded-2xl py-3 px-11 text-slate-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <div className="grid gap-3 mb-24">
        {filteredFairs.map(fair => (
          <div 
            key={fair.id}
            className="group relative bg-white rounded-2xl border border-slate-100 p-4 shadow-sm active:scale-[0.98] transition-all flex items-center justify-between"
          >
            <div 
              className="flex-1 cursor-pointer"
              onClick={() => onSelect(fair.id)}
            >
              <h3 className="font-bold text-slate-800 leading-tight">{fair.name}</h3>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {fair.city}, {fair.country} • {fair.date}
              </p>
            </div>
            <button 
              onClick={() => onToggleFavorite(fair.id)}
              className={`p-2 transition-colors ${favorites.includes(fair.id) ? 'text-yellow-500' : 'text-slate-200 hover:text-slate-300'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={favorites.includes(fair.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </button>
          </div>
        ))}

        {!showAddForm ? (
          <button 
            onClick={() => setShowAddForm(true)}
            className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-slate-400 font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Nueva feria manual
          </button>
        ) : (
          <form onSubmit={handleAddSubmit} className="bg-white border border-blue-100 rounded-2xl p-4 shadow-md animate-in slide-in-from-bottom-2 duration-200">
            <h4 className="font-bold text-slate-800 mb-3">Añadir Feria</h4>
            <div className="space-y-2">
              <input 
                required
                placeholder="Nombre de la feria"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                value={newFair.name} onChange={e => setNewFair({...newFair, name: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-2">
                <input 
                  required
                  placeholder="Ciudad"
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  value={newFair.city} onChange={e => setNewFair({...newFair, city: e.target.value})}
                />
                <input 
                  required
                  placeholder="País"
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  value={newFair.country} onChange={e => setNewFair({...newFair, country: e.target.value})}
                />
              </div>
              <input 
                placeholder="Fechas (ej. 20-23 Feb)"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                value={newFair.date} onChange={e => setNewFair({...newFair, date: e.target.value})}
              />
            </div>
            <div className="flex gap-2 mt-4">
              <button type="submit" className="flex-1 bg-blue-600 text-white font-bold py-2 rounded-xl active:scale-95 transition-transform">Guardar</button>
              <button type="button" onClick={() => setShowAddForm(false)} className="flex-1 bg-slate-100 text-slate-600 font-bold py-2 rounded-xl">Cancelar</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
