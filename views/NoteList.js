
import React, { useState } from 'react';

export default function NoteList({ fairId, notes, exhibitors, onSave, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [current, setCurrent] = useState({ title: '', content: '', exhibitorId: '', tags: '' });

  const handleSave = (e) => {
    e.preventDefault();
    if (current.content) {
      onSave(current);
      setIsEditing(false);
      setCurrent({ title: '', content: '', exhibitorId: '', tags: '' });
    }
  };

  if (isEditing) {
    return (
      <div className="animate-in slide-in-from-bottom-4 duration-300">
        <h2 className="text-2xl font-black text-slate-800 mb-6">Crear Nota</h2>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Título (opcional)</label>
              <input 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                value={current.title} onChange={e => setCurrent({...current, title: e.target.value})}
                placeholder="Ej. Resumen del primer día"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Vincular a Empresa</label>
              <select 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                value={current.exhibitorId} onChange={e => setCurrent({...current, exhibitorId: e.target.value})}
              >
                <option value="">Ninguna</option>
                {exhibitors.map(ex => <option key={ex.id} value={ex.id}>{ex.name}</option>)}
              </select>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Contenido de la nota *</label>
             <textarea 
               required
               autoFocus
               rows="10"
               className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
               value={current.content} onChange={e => setCurrent({...current, content: e.target.value})}
               placeholder="Escribe aquí tus ideas, contactos o reflexiones..."
             />
          </div>

          <div className="flex gap-3 pb-24">
            <button type="submit" className="flex-1 bg-emerald-600 text-white font-black py-4 rounded-2xl shadow-lg active:scale-95 transition-transform">Guardar Nota</button>
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
          <h2 className="text-2xl font-black text-slate-800 leading-none">Notas</h2>
          <p className="text-slate-500 text-sm mt-1">Tu diario del evento</p>
        </div>
        <button 
          onClick={() => setIsEditing(true)}
          className="bg-emerald-600 text-white p-4 rounded-2xl shadow-lg shadow-emerald-100 active:scale-90 transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      </div>

      <div className="grid gap-4 mb-24">
        {notes.length > 0 ? notes.map(note => {
          const ex = exhibitors.find(e => e.id === note.exhibitorId);
          return (
            <div key={note.id} className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm relative group">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-black text-slate-800 text-lg leading-tight flex-1 pr-6">{note.title || 'Nota sin título'}</h3>
                <button 
                  onClick={() => onDelete(note.id)}
                  className="p-1 text-slate-200 hover:text-red-400 active:scale-90 transition-transform"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              <p className="text-slate-600 text-sm line-clamp-4 leading-relaxed whitespace-pre-wrap">{note.content}</p>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-50">
                <span className="text-[10px] text-slate-300 font-bold uppercase">{new Date(note.createdAt).toLocaleDateString()}</span>
                {ex && <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase">{ex.name}</span>}
              </div>
            </div>
          );
        }) : (
          <div className="text-center py-12 px-6">
            <div className="bg-slate-100 h-16 w-16 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <p className="text-slate-400 text-sm font-bold">Escribe tus primeras notas.</p>
          </div>
        )}
      </div>
    </div>
  );
}
