
import React, { useState } from 'react';

const TaskList = ({ fairId, tasks, exhibitors, onSave, onDelete, onToggle }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [current, setCurrent] = useState({ title: '', exhibitorId: '', priority: 'media', completed: false });

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  if (isAdding) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
        <h2 className="text-xl font-bold">Nueva Tarea / Follow-up</h2>
        <div className="space-y-3">
          <input 
            className="w-full p-3 border rounded-lg" placeholder="¿Qué hay que hacer?"
            value={current.title} onChange={e => setCurrent({...current, title: e.target.value})}
          />
          <select 
            className="w-full p-3 border rounded-lg"
            value={current.exhibitorId} onChange={e => setCurrent({...current, exhibitorId: e.target.value})}
          >
            <option value="">Relacionar con Expositor (opcional)</option>
            {exhibitors.map(ex => <option key={ex.id} value={ex.id}>{ex.name}</option>)}
          </select>
          <select 
            className="w-full p-3 border rounded-lg"
            value={current.priority} onChange={e => setCurrent({...current, priority: e.target.value})}
          >
            <option value="baja">Prioridad Baja</option>
            <option value="media">Prioridad Media</option>
            <option value="alta">Prioridad Alta</option>
          </select>
          
          <div className="flex gap-3 pt-2">
            <button 
              onClick={() => { if (current.title) { onSave(current); setIsAdding(false); } }}
              className="flex-1 bg-amber-600 text-white font-bold py-3 rounded-lg"
            >
              Añadir
            </button>
            <button 
              onClick={() => setIsAdding(false)}
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
        <h2 className="text-2xl font-bold">Tareas</h2>
        <button 
          onClick={() => { setCurrent({ title: '', exhibitorId: '', priority: 'media', completed: false }); setIsAdding(true); }}
          className="bg-amber-600 text-white flex items-center gap-2 px-4 py-2 rounded-lg font-bold shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
          Nueva Tarea
        </button>
      </div>

      <div className="space-y-3">
        {sortedTasks.length > 0 ? sortedTasks.map(task => {
          const ex = exhibitors.find(e => e.id === task.exhibitorId);
          return (
            <div key={task.id} className={`bg-white p-4 rounded-xl shadow-sm border ${task.completed ? 'opacity-50 border-gray-100' : 'border-amber-100'} flex items-center gap-4`}>
              <button 
                onClick={() => onToggle(task.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${task.completed ? 'bg-amber-500 border-amber-500 text-white' : 'border-gray-300'}`}
              >
                {task.completed && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
              </button>
              <div className="flex-1">
                <p className={`font-bold ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.title}</p>
                {ex && <p className="text-[10px] text-amber-600 font-bold uppercase">{ex.name}</p>}
              </div>
              <button onClick={() => onDelete(task.id)} className="text-gray-300 hover:text-red-500"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
            </div>
          );
        }) : <p className="text-center text-gray-400 py-10">No hay tareas pendientes.</p>}
      </div>
    </div>
  );
};

export default TaskList;
