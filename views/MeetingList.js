
import React, { useState } from 'react';

const MeetingList = ({ fairId, meetings, exhibitors, onSave, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [current, setCurrent] = useState({ 
    exhibitorId: '', dateTime: '', location: '', objective: '', notes: '', status: 'planificada' 
  });

  const sorted = [...meetings].sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

  if (isEditing) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
        <h2 className="text-xl font-bold">{current.id ? 'Editar' : 'Nueva'} Reunión</h2>
        <div className="space-y-3">
          <select 
            className="w-full p-3 border rounded-lg"
            value={current.exhibitorId} onChange={e => setCurrent({...current, exhibitorId: e.target.value})}
          >
            <option value="">Seleccionar Expositor *</option>
            {exhibitors.map(ex => <option key={ex.id} value={ex.id}>{ex.name}</option>)}
          </select>
          <input 
            type="datetime-local" className="w-full p-3 border rounded-lg"
            value={current.dateTime} onChange={e => setCurrent({...current, dateTime: e.target.value})}
          />
          <input 
            className="w-full p-3 border rounded-lg" placeholder="Ubicación (ej: Stand B12)"
            value={current.location} onChange={e => setCurrent({...current, location: e.target.value})}
          />
          <input 
            className="w-full p-3 border rounded-lg" placeholder="Objetivo de la reunión"
            value={current.objective} onChange={e => setCurrent({...current, objective: e.target.value})}
          />
          <textarea 
            className="w-full p-3 border rounded-lg" placeholder="Notas preparatorias..." rows="3"
            value={current.notes} onChange={e => setCurrent({...current, notes: e.target.value})}
          ></textarea>
          
          <div className="flex gap-3 pt-2">
            <button 
              onClick={() => { if (current.exhibitorId && current.dateTime) { onSave(current); setIsEditing(false); } }}
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Agenda</h2>
        <button 
          onClick={() => { setCurrent({ exhibitorId: '', dateTime: '', location: '', objective: '', notes: '', status: 'planificada' }); setIsEditing(true); }}
          className="bg-indigo-600 text-white flex items-center gap-2 px-4 py-2 rounded-lg font-bold shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
          Nueva Cita
        </button>
      </div>

      <div className="space-y-4">
        {sorted.length > 0 ? sorted.map(meet => {
          const ex = exhibitors.find(e => e.id === meet.exhibitorId);
          return (
            <div key={meet.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex">
               <div className="w-1.5 bg-indigo-500"></div>
               <div className="p-4 flex-1">
                 <div className="flex justify-between items-start mb-2">
                   <div>
                     <h4 className="font-bold text-lg">{ex?.name || 'Expositor no encontrado'}</h4>
                     <p className="text-indigo-600 text-sm font-semibold">
                       {new Date(meet.dateTime).toLocaleDateString()} • {new Date(meet.dateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                     </p>
                   </div>
                   <div className="flex gap-2">
                     <button onClick={() => { setCurrent(meet); setIsEditing(true); }} className="text-gray-400 p-1"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                     <button onClick={() => onDelete(meet.id)} className="text-red-300 p-1"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                   </div>
                 </div>
                 <div className="space-y-1">
                   {meet.location && <p className="text-sm text-gray-600 flex items-center gap-1">📍 {meet.location}</p>}
                   {meet.objective && <p className="text-sm font-medium">🎯 {meet.objective}</p>}
                   {meet.notes && <p className="text-xs text-gray-400 mt-2 italic">{meet.notes}</p>}
                 </div>
               </div>
            </div>
          );
        }) : <p className="text-center text-gray-400 py-10">Tu agenda está vacía.</p>}
      </div>
    </div>
  );
};

export default MeetingList;
