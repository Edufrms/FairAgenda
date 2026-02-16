
import React from 'react';

const StatCard = ({ label, count, color, icon, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-all"
  >
    <div className={`p-3 rounded-full mb-2 ${color} bg-opacity-10`}>
      {React.cloneElement(icon, { className: `h-6 w-6 ${color.replace('bg-', 'text-')}` })}
    </div>
    <span className="text-xl font-black text-slate-800">{count}</span>
    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{label}</span>
  </div>
);

export default function Dashboard({ fair, data, setView }) {
  const exhibitors = data.exhibitors.filter(e => e.fairId === fair.id);
  const meetings = data.meetings.filter(m => m.fairId === fair.id);
  const tasks = data.tasks.filter(t => t.fairId === fair.id);
  const pendingTasks = tasks.filter(t => !t.completed).length;

  const nextMeeting = [...meetings]
    .filter(m => new Date(m.dateTime) > new Date())
    .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))[0];

  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-slate-800 mb-1">¡Hola de nuevo!</h2>
        <p className="text-slate-500 text-sm">Resumen para {fair.name}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <StatCard 
          label="Empresas" 
          count={exhibitors.length} 
          color="bg-blue-600" 
          icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
          onClick={() => setView('exhibitors')}
        />
        <StatCard 
          label="Reuniones" 
          count={meetings.length} 
          color="bg-indigo-600" 
          icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
          onClick={() => setView('meetings')}
        />
        <StatCard 
          label="Tareas" 
          count={pendingTasks} 
          color="bg-amber-500" 
          icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>}
          onClick={() => setView('tasks')}
        />
        <StatCard 
          label="Notas" 
          count={data.notes.filter(n => n.fairId === fair.id).length} 
          color="bg-emerald-600" 
          icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>}
          onClick={() => setView('notes')}
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm mb-6">
        <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-4">Próxima Reunión</h4>
        {nextMeeting ? (
          <div className="flex items-center gap-4">
            <div className="bg-indigo-50 text-indigo-600 p-3 rounded-2xl text-center">
              <span className="block text-xs font-bold uppercase">{new Date(nextMeeting.dateTime).toLocaleDateString(undefined, { month: 'short' })}</span>
              <span className="block text-2xl font-black">{new Date(nextMeeting.dateTime).getDate()}</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <h5 className="font-bold text-slate-800 truncate">{exhibitors.find(e => e.id === nextMeeting.exhibitorId)?.name || 'Empresa'}</h5>
              <p className="text-xs text-slate-500 truncate">{nextMeeting.objective || 'Sin objetivo definido'}</p>
              <p className="text-[10px] text-indigo-500 font-bold mt-1">
                {new Date(nextMeeting.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {nextMeeting.location || 'Stand'}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-slate-400 text-sm">No hay reuniones planificadas</p>
            <button 
              onClick={() => setView('meetings')}
              className="text-blue-600 text-xs font-bold mt-2 hover:underline"
            >
              Programar ahora
            </button>
          </div>
        )}
      </div>

      <div className="bg-blue-600 text-white rounded-3xl p-6 shadow-xl shadow-blue-200 relative overflow-hidden">
        <div className="relative z-10">
          <h4 className="text-lg font-bold mb-1">Acceso Rápido</h4>
          <p className="text-blue-100 text-xs mb-4">Añade información en segundos mientras caminas por la feria.</p>
          <div className="flex gap-2">
            <button 
              onClick={() => setView('exhibitors')}
              className="bg-white text-blue-600 font-bold px-4 py-2 rounded-xl text-xs active:scale-95 transition-transform"
            >
              + Empresa
            </button>
            <button 
              onClick={() => setView('notes')}
              className="bg-blue-500 text-white font-bold px-4 py-2 rounded-xl text-xs active:scale-95 transition-transform"
            >
              + Nota rápida
            </button>
          </div>
        </div>
        <div className="absolute top-[-20%] right-[-10%] opacity-10">
          <svg className="h-40 w-40" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
        </div>
      </div>
    </div>
  );
}
