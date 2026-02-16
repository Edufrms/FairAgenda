
import React, { useState } from 'react';

export default function MeetingList({ fairId, meetings, exhibitors, onSave, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [current, setCurrent] = useState({ exhibitorId: '', dateTime: '', location: '', objective: '', notes: '' });

  const sortedMeetings = [...meetings].sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

  const handleSave = (e) => {
    e.preventDefault();
    if (current.exhibitorId && current.dateTime) {
      onSave(current);
      setIsEditing(false);
      setCurrent({ exhibitorId: '', dateTime: '', location: '', objective: '', notes: '' });
    }
  };

  if (isEditing) {
    return (
      <div className="animate-in slide-in-from-bottom-4 duration-300">
        <h2 className="text-2xl font-black text-slate-800 mb-6">Programar Cita</h2>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Empresa *</label>
              <select 
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                value={current.exhibitorId} onChange={e => setCurrent({...current, exhibitorId: e.target.value})}
              >
                <option value="">Selecciona una empresa...</option>
                {exhibitors.map(ex => <option key={ex.id} value={ex.id}>{ex.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Fecha y Hora *</label>
              <input 
                required
                type="datetime-local"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                value={current.dateTime} onChange={e => setCurrent({...current, dateTime: e.target.value})}
              />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Lugar / Stand</label>
              <input 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                value={current.location} onChange={e => setCurrent({...current, location: e.target.value})}
                placeholder="Ej. Stand B45"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Objetivo breve</label>
              <input 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                value={current.objective} onChange={e => setCurrent({...current, objective: e.target.value})}
                placeholder="Ej. Ver nuevo catálogo"
              />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Notas post-reunión</label>
             <textarea 
               rows="5"
               className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
               value={current.notes} onChange={e => setCurrent({...current, notes: e.target.value})}
               placeholder="Resume lo hablado aquí..."
             />
          </div>

          <div className="flex gap-3 pb-24">
            <button type="submit" className="flex-1 bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-lg active:scale-95 transition-transform">Agendar</button>
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
          <h2 className="text-2xl font-black text-slate-800 leading-none">Mi Agenda</h2>
          <p className="text-slate-500 text-sm mt-1">Citas programadas</p>
        </div>
        <button 
          onClick={() => setIsEditing(true)}
          className="bg-indigo-600 text-white p-4 rounded-2xl shadow-lg shadow-indigo-100 active:scale-90 transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
      </div>

      <div className="space-y-4 mb-24">
        {sortedMeetings.length > 0 ? sortedMeetings.map(meet => {
          const ex = exhibitors.find(e => e.id === meet.exhibitorId);
          const date = new Date(meet.dateTime);
          return (
            <div key={meet.id} className="bg-white border border-slate-100 rounded-3xl p-4 shadow-sm flex items-stretch gap-4 overflow-hidden">
               <div className="w-1.5 bg-indigo-500 rounded-full my-2"></div>
               <div className="flex-1">
                 <div className="flex justify-between items-start">
                   <div className="flex-1 pr-6">
                     <h4 className="font-black text-slate-800 text-lg leading-tight truncate">{ex?.name || 'Cita borrada'}</h4>
                     <p className="text-[10px] text-indigo-500 font-black uppercase tracking-widest mt-0.5">
                       {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {date.toLocaleDateString([], { day: 'numeric', month: 'short' })}
                     </p>
                   </div>
                   <button 
                    onClick={() => onDelete(meet.id)}
                    className="p-1 text-slate-200 hover:text-red-400 active:scale-90 transition-transform"
                   >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                     </svg>
                   </button>
                 </div>
                 <div className="mt-2 space-y-1">
                   {meet.location && <p className="text-xs text-slate-500 flex items-center gap-1 font-medium">📍 {meet.location}</p>}
                   {meet.objective && <p className="text-xs text-slate-700 font-bold">🎯 {meet.objective}</p>}
                 </div>
                 {meet.notes && (
                   <div className="mt-3 p-3 bg-slate-50 rounded-2xl text-[11px] text-slate-500 italic">
                     {meet.notes}
                   </div>
                 )}
               </div>
            </div>
          );
        }) : (
          <div className="text-center py-12 px-6">
            <div className="bg-slate-100 h-16 w-16 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-slate-400 text-sm font-bold">No tienes reuniones programadas.</p>
          </div>
        )}
      </div>
    </div>
  );
}
