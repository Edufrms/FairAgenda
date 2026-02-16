
import React, { useState } from 'react';
import { FAIR_STATUS, PRIORITY, CATEGORIES } from '../constants.js';

export default function ExhibitorList({ fairId, exhibitors, onSave, onDelete }) {
  const [filter, setFilter] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [current, setCurrent] = useState({ 
    name: '', stand: '', status: FAIR_STATUS.PENDING, 
    priority: PRIORITY.MEDIUM, category: 'Otros', contact: '', 
    email: '', notes: '' 
  });

  const filtered = exhibitors.filter(e => 
    e.name.toLowerCase().includes(filter.toLowerCase()) || 
    e.stand.toLowerCase().includes(filter.toLowerCase())
  );

  const handleEdit = (ex) => {
    setCurrent(ex);
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (current.name) {
      onSave(current);
      setIsEditing(false);
      setCurrent({ name: '', stand: '', status: FAIR_STATUS.PENDING, priority: PRIORITY.MEDIUM, category: 'Otros', contact: '', email: '', notes: '' });
    }
  };

  if (isEditing) {
    return (
      <div className="animate-in slide-in-from-bottom-4 duration-300">
        <h2 className="text-2xl font-black text-slate-800 mb-6">{current.id ? 'Editar' : 'Nuevo'} Expositor</h2>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Nombre Empresa *</label>
              <input 
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                value={current.name} onChange={e => setCurrent({...current, name: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Stand / Pabellón</label>
                <input 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  value={current.stand} onChange={e => setCurrent({...current, stand: e.target.value})}
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Categoría</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  value={current.category} onChange={e => setCurrent({...current, category: e.target.value})}
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Estado</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  value={current.status} onChange={e => setCurrent({...current, status: e.target.value})}
                >
                  {Object.values(FAIR_STATUS).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Prioridad</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  value={current.priority} onChange={e => setCurrent({...current, priority: e.target.value})}
                >
                  {Object.values(PRIORITY).map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Notas / Detalles</label>
             <textarea 
               rows="4"
               className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
               value={current.notes} onChange={e => setCurrent({...current, notes: e.target.value})}
               placeholder="Escribe aquí lo que necesites recordar..."
             />
          </div>

          <div className="flex gap-3 pb-24">
            <button type="submit" className="flex-1 bg-blue-600 text-white font-black py-4 rounded-2xl shadow-lg active:scale-95 transition-transform">Guardar Empresa</button>
            <button type="button" onClick={() => setIsEditing(false)} className="flex-1 bg-slate-200 text-slate-600 font-black py-4 rounded-2xl active:scale-95 transition-transform">Cancelar</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-800 leading-none">Empresas</h2>
          <p className="text-slate-500 text-sm mt-1">Directorio de expositores</p>
        </div>
        <button 
          onClick={() => setIsEditing(true)}
          className="bg-blue-600 text-white p-4 rounded-2xl shadow-lg shadow-blue-100 active:scale-90 transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      <div className="relative mb-6">
        <input 
          type="text"
          placeholder="Busca por nombre o stand..."
          className="w-full bg-white border border-slate-200 rounded-2xl py-3 px-11 text-slate-700 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <div className="grid gap-3 mb-24">
        {filtered.length > 0 ? filtered.map(ex => (
          <div key={ex.id} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm relative group overflow-hidden">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1 pr-8">
                <h3 className="font-black text-slate-800 text-lg leading-tight">{ex.name}</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wide mt-1">
                  Stand {ex.stand || 'N/A'} • {ex.category}
                </p>
              </div>
              <div className={`text-[9px] font-black uppercase px-2 py-1 rounded-md ${
                ex.priority === PRIORITY.HIGH ? 'bg-red-100 text-red-600' :
                ex.priority === PRIORITY.MEDIUM ? 'bg-amber-100 text-amber-600' :
                'bg-green-100 text-green-600'
              }`}>
                {ex.priority}
              </div>
            </div>

            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-50">
               <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-lg uppercase">{ex.status}</span>
               <div className="flex-1"></div>
               <button 
                onClick={() => handleEdit(ex)}
                className="p-2 text-slate-300 hover:text-blue-500 active:scale-90 transition-transform"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                 </svg>
               </button>
               <button 
                onClick={() => onDelete(ex.id)}
                className="p-2 text-slate-200 hover:text-red-400 active:scale-90 transition-transform"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                 </svg>
               </button>
            </div>
          </div>
        )) : (
          <div className="text-center py-12 px-6">
            <div className="bg-slate-100 h-16 w-16 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <p className="text-slate-400 text-sm font-bold">No hay empresas registradas aún.</p>
          </div>
        )}
      </div>
    </div>
  );
}
