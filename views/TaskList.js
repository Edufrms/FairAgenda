
import React, { useState } from 'react';
import { PRIORITY } from '../constants.js';

export default function TaskList({ fairId, tasks, exhibitors, onSave, onDelete, onToggle }) {
  const [isAdding, setIsAdding] = useState(false);
  const [current, setCurrent] = useState({ title: '', exhibitorId: '', priority: PRIORITY.MEDIUM, completed: false, deadline: '' });

  const sorted = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const handleSave = (e) => {
    e.preventDefault();
    if (current.title) {
      onSave(current);
      setIsAdding(false);
      setCurrent({ title: '', exhibitorId: '', priority: PRIORITY.MEDIUM, completed: false, deadline: '' });
    }
  };

  if (isAdding) {
    return (
      <div className="animate-in slide-in-from-bottom-4 duration-300">
        <h2 className="text-2xl font-black text-slate-800 mb-6">Nueva Tarea</h2>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Descripción *</label>
            <input 
              required
              autoFocus
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              value={current.title} onChange={e => setCurrent({...current, title: e.target.value})}
              placeholder="Ej. Enviar propuesta técnica"
            />
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Empresa Relacionada</label>
              <select 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                value={current.exhibitorId} onChange={e => setCurrent({...current, exhibitorId: e.target.value})}
              >
                <option value="">Ninguna</option>
                {exhibitors.map(ex => <option key={ex.id} value={ex.id}>{ex.name}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Prioridad</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  value={current.priority} onChange={e => setCurrent({...current, priority: e.target.value})}
                >
                  {Object.values(PRIORITY).map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Límite (opcional)</label>
                <input 
                  type="date"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  value={current.deadline} onChange={e => setCurrent({...current, deadline: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pb-24">
            <button type="submit" className="flex-1 bg-amber-500 text-white font-black py-4 rounded-2xl shadow-lg active:scale-95 transition-transform">Añadir Tarea</button>
            <button type="button" onClick={() => setIsAdding(false)} className="flex-1 bg-slate-200 text-slate-600 font-black py-4 rounded-2xl active:scale-95 transition-transform">Cancelar</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-800 leading-none">Seguimientos</h2>
          <p className="text-slate-500 text-sm mt-1">Tareas y compromisos</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-amber-500 text-white p-4 rounded-2xl shadow-lg shadow-amber-100 active:scale-90 transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      <div className="space-y-3 mb-24">
        {sorted.length > 0 ? sorted.map(task => {
          const ex = exhibitors.find(e => e.id === task.exhibitorId);
          return (
            <div key={task.id} className={`bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4 transition-all ${task.completed ? 'opacity-50 grayscale' : ''}`}>
              <button 
                onClick={() => onToggle(task.id)}
                className={`flex-shrink-0 h-7 w-7 rounded-full border-2 flex items-center justify-center transition-colors ${
                  task.completed ? 'bg-amber-500 border-amber-500 text-white' : 'border-slate-200 text-transparent'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </button>
              <div className="flex-1 min-w-0">
                <p className={`font-bold text-slate-800 text-sm leading-tight break-words ${task.completed ? 'line-through' : ''}`}>
                  {task.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  {ex && <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded uppercase">{ex.name}</span>}
                  {task.deadline && (
                    <span className="text-[9px] text-slate-400 font-bold flex items-center gap-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {new Date(task.deadline).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              <button 
                onClick={() => onDelete(task.id)}
                className="p-2 text-slate-200 hover:text-red-400 active:scale-90 transition-transform"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          );
        }) : (
          <div className="text-center py-12 px-6">
            <div className="bg-slate-100 h-16 w-16 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <p className="text-slate-400 text-sm font-bold">Sin tareas pendientes.</p>
          </div>
        )}
      </div>
    </div>
  );
}
