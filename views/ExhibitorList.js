
import React, { useState } from 'react';
import { FAIR_STATUS, PRIORITY, CATEGORIES } from '../constants';

const ExhibitorList = ({ fairId, exhibitors, onSave, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [current, setCurrent] = useState({ 
    name: '', stand: '', status: FAIR_STATUS.PENDING, 
    priority: PRIORITY.MEDIUM, category: '', contact: '', 
    email: '', phone: '', web: '', notes: '' 
  });
  const [filter, setFilter] = useState('');

  const filtered = exhibitors.filter(e => 
    e.name.toLowerCase().includes(filter.toLowerCase()) || 
    e.stand.toLowerCase().includes(filter.toLowerCase())
  );

  if (isEditing) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
        <h2 className="text-xl font-bold">{current.id ? 'Editar' : 'Nuevo'} Expositor</h2>
        <div className="space-y-3">
          <input 
            className="w-full p-3 border rounded-lg" placeholder="Nombre de Empresa *"
            value={current.name} onChange={e => setCurrent({...current, name: e.target.value})}
          />
          <div className="grid grid-cols-2 gap-3">
            <input 
              className="w-full p-3 border rounded-lg" placeholder="Stand / Ubicación"
              value={current.stand} onChange={e => setCurrent({...current, stand: e.target.value})}
            />
            <select 
              className="w-full p-3 border rounded-lg"
              value={current.category} onChange={e => setCurrent({...current, category: e.target.value})}
            >
              <option value="">Categoría</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <select 
              className="w-full p-3 border rounded-lg"
              value={current.status} onChange={e => setCurrent({...current, status: e.target.value})}
            >
              {Object.values(FAIR_STATUS).map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
            </select>
            <select 
              className="w-full p-3 border rounded-lg"
              value={current.priority} onChange={e => setCurrent({...current, priority: e.target.value})}
            >
              {Object.values(PRIORITY).map(p => <option key={p} value={p}>Prioridad {p}</option>)}
            </select>
          </div>
          <input 
            className="w-full p-3 border rounded-lg" placeholder="Persona de Contacto"
            value={current.contact} onChange={e => setCurrent({...current, contact: e.target.value})}
          />
          <textarea 
            className="w-full p-3 border rounded-lg" placeholder="Notas adicionales..." rows="3"
            value={current.notes} onChange={e => setCurrent({...current, notes: e.target.value})}
          ></textarea>
          
          <div className="flex gap-3 pt-2">
            <button 
              onClick={() => { if (current.name) { onSave(current); setIsEditing(false); } }}
              className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-lg"
            >
              Guardar
            </button>
            <button 
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gray-100 text-gray-600 font-bold py-3 rounded-lg"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getPriorityColor = (p) => {
    if (p === PRIORITY.HIGH) return 'text-red-600 bg-red-50';
    if (p === PRIORITY.MEDIUM) return 'text-amber-600 bg-amber-50';
    return 'text-green-600 bg-green-50';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Expositores</h2>
        <button 
          onClick={() => { setCurrent({ name: '', stand: '', status: FAIR_STATUS.PENDING, priority: PRIORITY.MEDIUM, category: '', contact: '', email: '', phone: '', web: '', notes: '' }); setIsEditing(true); }}
          className="bg-blue-600 text-white flex items-center gap-2 px-4 py-2 rounded-lg font-bold shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
          Nuevo
        </button>
      </div>

      <div className="relative">
        <input 
          type="text" placeholder="Filtrar por nombre o stand..." 
          className="w-full p-4 pl-12 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          value={filter} onChange={e => setFilter(e.target.value)}
        />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute left-4 top-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
      </div>

      <div className="grid gap-4 pb-24">
        {filtered.length > 0 ? filtered.map(ex => (
          <div key={ex.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-3 relative">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{ex.name}</h3>
                <p className="text-sm text-gray-500">{ex.stand || 'Sin stand asignado'} • {ex.category || 'Sin categoría'}</p>
              </div>
              <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${getPriorityColor(ex.priority)}`}>
                {ex.priority}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
               <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-medium truncate">{ex.status}</span>
               {ex.contact && <span className="text-gray-400 text-xs truncate">👤 {ex.contact}</span>}
            </div>

            <div className="flex gap-2 pt-2 border-t border-gray-50">
              <button 
                onClick={() => { setCurrent(ex); setIsEditing(true); }}
                className="flex-1 text-blue-600 text-sm font-bold p-2 hover:bg-blue-50 rounded"
              >
                Editar
              </button>
              <button 
                onClick={() => onDelete(ex.id)}
                className="flex-1 text-red-500 text-sm font-bold p-2 hover:bg-red-50 rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        )) : <p className="text-center text-gray-400 py-10">No se encontraron expositores.</p>}
      </div>
    </div>
  );
};

export default ExhibitorList;
