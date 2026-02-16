
import React, { useState } from 'react';

const SearchGlobal = ({ data, fairs, onNavigate }) => {
  const [term, setTerm] = useState('');

  const search = () => {
    if (!term) return { fairs: [], exhibitors: [], meetings: [], notes: [], tasks: [] };
    const lower = term.toLowerCase();
    
    return {
      fairs: fairs.filter(f => f.name.toLowerCase().includes(lower) || f.city.toLowerCase().includes(lower)),
      exhibitors: data.exhibitors.filter(e => e.name.toLowerCase().includes(lower) || e.stand.toLowerCase().includes(lower)),
      meetings: data.meetings.filter(m => m.objective.toLowerCase().includes(lower) || m.location.toLowerCase().includes(lower)),
      notes: data.notes.filter(n => n.title.toLowerCase().includes(lower) || n.content.toLowerCase().includes(lower)),
      tasks: data.tasks.filter(t => t.title.toLowerCase().includes(lower))
    };
  };

  const results = search();
  const total = results.fairs.length + results.exhibitors.length + results.meetings.length + results.notes.length + results.tasks.length;

  const ResultSection = ({ title, items, icon, view }) => {
    if (items.length === 0) return null;
    return (
      <div className="space-y-3 mt-6">
        <h3 className="text-xs font-bold uppercase text-gray-400 flex items-center gap-2">
          {icon} {title}
        </h3>
        <div className="space-y-2">
          {items.map(item => (
            <div 
              key={item.id} 
              onClick={() => onNavigate(view, item.fairId || item.id)}
              className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm cursor-pointer hover:bg-gray-50 active:scale-[0.99]"
            >
              <p className="font-bold text-sm truncate">{item.name || item.title || item.objective || 'Sin título'}</p>
              {item.city && <p className="text-[10px] text-gray-500">{item.city}, {item.country}</p>}
              {item.stand && <p className="text-[10px] text-blue-500">Stand: {item.stand}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="relative">
        <input 
          autoFocus
          type="text" placeholder="Búsqueda global..." 
          className="w-full p-4 pl-12 bg-white border border-gray-200 rounded-xl shadow-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={term} onChange={e => setTerm(e.target.value)}
        />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute left-4 top-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </div>

      {term ? (
        <div>
          <p className="text-sm text-gray-500">{total} resultados encontrados</p>
          <ResultSection title="Ferias" items={results.fairs} view="dashboard" icon="🌍" />
          <ResultSection title="Expositores" items={results.exhibitors} view="exhibitors" icon="🏢" />
          <ResultSection title="Reuniones" items={results.meetings} view="meetings" icon="📅" />
          <ResultSection title="Notas" items={results.notes} view="notes" icon="📝" />
          <ResultSection title="Tareas" items={results.tasks} view="tasks" icon="✅" />
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
           <p>Escribe algo para buscar en toda la aplicación</p>
        </div>
      )}
    </div>
  );
};

export default SearchGlobal;
