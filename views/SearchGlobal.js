
import React, { useState } from 'react';

export default function SearchGlobal({ data, fairs, onNavigate }) {
  const [term, setTerm] = useState('');

  const performSearch = () => {
    if (!term || term.length < 2) return null;
    const t = term.toLowerCase();

    return {
      fairs: fairs.filter(f => f.name.toLowerCase().includes(t) || f.city.toLowerCase().includes(t)),
      exhibitors: data.exhibitors.filter(e => e.name.toLowerCase().includes(t) || e.notes.toLowerCase().includes(t)),
      meetings: data.meetings.filter(m => m.objective.toLowerCase().includes(t) || m.notes.toLowerCase().includes(t)),
      notes: data.notes.filter(n => n.title.toLowerCase().includes(t) || n.content.toLowerCase().includes(t)),
      tasks: data.tasks.filter(tk => tk.title.toLowerCase().includes(t))
    };
  };

  const results = performSearch();

  const ResultGroup = ({ title, items, icon, viewKey, iconColor }) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="mb-6 animate-in slide-in-from-left-2 duration-300">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
          <span className={iconColor}>{icon}</span> {title}
        </h3>
        <div className="space-y-2">
          {items.map(item => (
            <div 
              key={item.id}
              onClick={() => onNavigate(viewKey, item.fairId || item.id)}
              className="bg-white border border-slate-100 rounded-2xl p-3 shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <p className="font-bold text-slate-800 text-sm truncate">{item.name || item.title || item.objective || 'Elemento'}</p>
              {item.city && <p className="text-[10px] text-slate-500">{item.city}, {item.country}</p>}
              {item.content && <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{item.content}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="animate-in fade-in duration-300">
      <div className="relative mb-8">
        <input 
          autoFocus
          type="text"
          placeholder="Busca en notas, empresas, tareas..."
          className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-12 text-slate-700 shadow-md focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute left-4 top-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {results ? (
        <div className="pb-24">
          <ResultGroup title="Ferias" items={results.fairs} viewKey="dashboard" iconColor="text-blue-500" icon="🌍" />
          <ResultGroup title="Empresas" items={results.exhibitors} viewKey="exhibitors" iconColor="text-blue-600" icon="🏢" />
          <ResultGroup title="Agenda" items={results.meetings} viewKey="meetings" iconColor="text-indigo-600" icon="📅" />
          <ResultGroup title="Notas" items={results.notes} viewKey="notes" iconColor="text-emerald-600" icon="📝" />
          <ResultGroup title="Tareas" items={results.tasks} viewKey="tasks" iconColor="text-amber-500" icon="✅" />
          
          {(Object.values(results).every(arr => arr.length === 0)) && (
            <div className="text-center py-20">
               <p className="text-slate-400 font-bold">No se encontró nada con "{term}"</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20 px-10">
           <p className="text-slate-300 text-sm font-bold">Escribe al menos 2 letras para empezar a buscar en toda la aplicación.</p>
        </div>
      )}
    </div>
  );
}
