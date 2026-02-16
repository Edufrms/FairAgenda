
import React from 'react';

const Dashboard = ({ fair, data, onNavigate }) => {
  const exhibitorsCount = data.exhibitors.filter(e => e.fairId === fair.id).length;
  const meetingsCount = data.meetings.filter(m => m.fairId === fair.id).length;
  const pendingTasks = data.tasks.filter(t => t.fairId === fair.id && !t.completed).length;
  
  const nextMeetings = data.meetings
    .filter(m => m.fairId === fair.id && new Date(m.dateTime) > new Date())
    .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))
    .slice(0, 3);

  const StatCard = ({ label, count, icon, color, onClick }) => (
    <div 
      onClick={onClick}
      className={`bg-white p-4 rounded-xl shadow-sm border-l-4 ${color} flex items-center justify-between cursor-pointer`}
    >
      <div>
        <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold">{count}</p>
      </div>
      <div className={`p-2 rounded-lg opacity-80`}>
        {icon}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-1 truncate">{fair.name}</h2>
        <p className="opacity-90 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          {fair.city}, {fair.country}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <StatCard 
          label="Expositores" count={exhibitorsCount} 
          color="border-blue-500" onClick={() => onNavigate('exhibitors')}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
        />
        <StatCard 
          label="Reuniones" count={meetingsCount} 
          color="border-indigo-500" onClick={() => onNavigate('meetings')}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
        />
        <StatCard 
          label="Tareas" count={pendingTasks} 
          color="border-amber-500" onClick={() => onNavigate('tasks')}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>}
        />
        <StatCard 
          label="Notas" count={data.notes.filter(n => n.fairId === fair.id).length} 
          color="border-emerald-500" onClick={() => onNavigate('notes')}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold flex items-center justify-between">
          <span>Próximas Reuniones</span>
          <button onClick={() => onNavigate('meetings')} className="text-blue-600 text-sm font-medium">Ver todas</button>
        </h3>
        {nextMeetings.length > 0 ? (
          <div className="space-y-3">
            {nextMeetings.map(meeting => {
              const exhibitor = data.exhibitors.find(e => e.id === meeting.exhibitorId);
              return (
                <div key={meeting.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="bg-blue-100 text-blue-700 p-2 rounded-lg text-center min-w-[60px]">
                    <p className="text-xs font-bold uppercase">{new Date(meeting.dateTime).toLocaleDateString(undefined, { month: 'short' })}</p>
                    <p className="text-lg font-bold leading-none">{new Date(meeting.dateTime).getDate()}</p>
                  </div>
                  <div>
                    <h4 className="font-bold">{exhibitor?.name || 'Reunión sin nombre'}</h4>
                    <p className="text-sm text-gray-500">{new Date(meeting.dateTime).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })} • {meeting.location || 'Stand'}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-6 bg-gray-100 rounded-xl">No hay reuniones planificadas.</p>
        )}
      </div>

      <button 
        onClick={() => onNavigate('exhibitors')}
        className="w-full bg-blue-50 text-blue-700 font-bold py-4 rounded-xl border border-blue-100 hover:bg-blue-100 transition-colors"
      >
        Gestionar Expositores
      </button>
    </div>
  );
};

export default Dashboard;
