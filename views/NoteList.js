
import React, { useState } from 'react';

const NoteList = ({ fairId, notes, exhibitors, onSave, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [current, setCurrent] = useState({ title: '', content: '', exhibitorId: '', tags: '' });

  if (isEditing) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
        <h2 className="text-xl font-bold">Nueva Nota</h2>
        <div className="space-y-3">
          <input 
            className="w-full p-3 border rounded-lg font-bold" placeholder="Título de la nota"
            value={current.title} onChange={e => setCurrent({...current, title: e.target.value})}
          />
          <textarea 
            className="w-full p-3 border rounded-lg" placeholder="Escribe aquí..." rows="8"
            value={current.content} onChange={e => setCurrent({...current, content: e.target.value})}
          ></textarea>
          <select 
            className="w-full p-3 border rounded-lg"
            value={current.exhibitorId} onChange={e => setCurrent({...current, exhibitorId: e.target.value})}
          >
            <option value="">Vincular a Expositor (opcional)</option>
            {exhibitors.map(ex => <option key={ex.id} value={ex.id}>{ex.name}</option>)}
          </select>
          <input 
            className="w-full p-3 border rounded-lg" placeholder="Etiquetas (separadas por coma)"
            value={current.tags} onChange={e => setCurrent({...current, tags: e.target.value})}
          />
          
          <div className="flex gap-3 pt-2">
            <button 
              onClick={() => { if (current.title || current.content) { onSave(current); setIsEditing(false); } }}
              className="flex-1 bg-emerald-600 text-white font-bold py-3 rounded-lg"
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Notas</h2>
        <button 
          onClick={() => { setCurrent({ title: '', content: '', exhibitorId: '', tags: '' }); setIsEditing(true); }}
          className="bg-emerald-600 text-white flex items-center gap-2 px-4 py-2 rounded-lg font-bold shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
          Nueva Nota
        </button>
      </div>

      <div className="grid gap-4">
        {notes.length > 0 ? notes.map(note => {
          const ex = exhibitors.find(e => e.id === note.exhibitorId);
          return (
            <div key={note.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative group">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{note.title || 'Sin título'}</h3>
                <div className="flex gap-2">
                   <button onClick={() => { setCurrent(note); setIsEditing(true); }} className="text-gray-300 hover:text-blue-500"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                   <button onClick={() => onDelete(note.id)} className="text-gray-300 hover:text-red-500"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                </div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-3 mb-3">{note.content}</p>
              <div className="flex flex-wrap gap-2">
                {ex && <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-1 rounded font-bold uppercase">{ex.name}</span>}
                {note.tags && note.tags.split(',').map(tag => (
                  <span key={tag} className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded">#{tag.trim()}</span>
                ))}
              </div>
            </div>
          );
        }) : <p className="text-center text-gray-400 py-10">Crea tu primera nota de la feria.</p>}
      </div>
    </div>
  );
};

export default NoteList;
