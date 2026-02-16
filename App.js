
import React, { useState, useEffect, useMemo } from 'react';
import { db } from './db';
import { INITIAL_FAIRS, FAIR_STATUS, PRIORITY } from './constants';

// Views
import FairSelector from './views/FairSelector';
import Dashboard from './views/Dashboard';
import ExhibitorList from './views/ExhibitorList';
import MeetingList from './views/MeetingList';
import TaskList from './views/TaskList';
import NoteList from './views/NoteList';
import Settings from './views/Settings';
import SearchGlobal from './views/SearchGlobal';

// UI Components
import Navigation from './components/Navigation';

const App = () => {
  const [data, setData] = useState(db.getData());
  const [currentFairId, setCurrentFairId] = useState(null);
  const [currentView, setCurrentView] = useState('selector'); // selector, dashboard, exhibitors, meetings, tasks, notes, search, settings
  const [editingItem, setEditingItem] = useState(null); // Used for modals/forms

  // Persistence
  useEffect(() => {
    db.saveData(data);
  }, [data]);

  const currentFair = useMemo(() => {
    const allFairs = [...INITIAL_FAIRS, ...data.userFairs];
    return allFairs.find(f => f.id === currentFairId);
  }, [currentFairId, data.userFairs]);

  // Actions
  const handleSelectFair = (id) => {
    setCurrentFairId(id);
    setCurrentView('dashboard');
  };

  const handleExitFair = () => {
    setCurrentFairId(null);
    setCurrentView('selector');
  };

  const updateData = (key, newItem) => {
    setData(prev => ({
      ...prev,
      [key]: newItem.id 
        ? prev[key].map(item => item.id === newItem.id ? newItem : item)
        : [...prev[key], { ...newItem, id: Date.now().toString(), createdAt: new Date().toISOString() }]
    }));
  };

  const deleteItem = (key, id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esto?')) {
      setData(prev => ({
        ...prev,
        [key]: prev[key].filter(item => item.id !== id)
      }));
    }
  };

  // Rendering logic
  const renderView = () => {
    if (!currentFairId && currentView !== 'settings' && currentView !== 'selector') {
      return <FairSelector 
        onSelect={handleSelectFair} 
        fairs={[...INITIAL_FAIRS, ...data.userFairs]} 
        favorites={data.favorites}
        onToggleFavorite={(id) => {
          setData(prev => ({
            ...prev,
            favorites: prev.favorites.includes(id) 
              ? prev.favorites.filter(fid => fid !== id) 
              : [...prev.favorites, id]
          }));
        }}
        onAddFair={(f) => updateData('userFairs', f)}
      />;
    }

    switch (currentView) {
      case 'selector':
        return <FairSelector 
          onSelect={handleSelectFair} 
          fairs={[...INITIAL_FAIRS, ...data.userFairs]} 
          favorites={data.favorites}
          onToggleFavorite={(id) => {
            setData(prev => ({
              ...prev,
              favorites: prev.favorites.includes(id) 
                ? prev.favorites.filter(fid => fid !== id) 
                : [...prev.favorites, id]
            }));
          }}
          onAddFair={(f) => updateData('userFairs', f)}
        />;
      case 'dashboard':
        return <Dashboard 
          fair={currentFair} 
          data={data} 
          onNavigate={setCurrentView} 
        />;
      case 'exhibitors':
        return <ExhibitorList 
          fairId={currentFairId} 
          exhibitors={data.exhibitors.filter(e => e.fairId === currentFairId)}
          onSave={(e) => updateData('exhibitors', { ...e, fairId: currentFairId })}
          onDelete={(id) => deleteItem('exhibitors', id)}
        />;
      case 'meetings':
        return <MeetingList 
          fairId={currentFairId}
          meetings={data.meetings.filter(m => m.fairId === currentFairId)}
          exhibitors={data.exhibitors.filter(e => e.fairId === currentFairId)}
          onSave={(m) => updateData('meetings', { ...m, fairId: currentFairId })}
          onDelete={(id) => deleteItem('meetings', id)}
        />;
      case 'tasks':
        return <TaskList 
          fairId={currentFairId}
          tasks={data.tasks.filter(t => t.fairId === currentFairId)}
          exhibitors={data.exhibitors.filter(e => e.fairId === currentFairId)}
          onSave={(t) => updateData('tasks', { ...t, fairId: currentFairId })}
          onDelete={(id) => deleteItem('tasks', id)}
          onToggle={(id) => {
             setData(prev => ({
               ...prev,
               tasks: prev.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
             }));
          }}
        />;
      case 'notes':
        return <NoteList 
          fairId={currentFairId}
          notes={data.notes.filter(n => n.fairId === currentFairId)}
          exhibitors={data.exhibitors.filter(e => e.fairId === currentFairId)}
          onSave={(n) => updateData('notes', { ...n, fairId: currentFairId })}
          onDelete={(id) => deleteItem('notes', id)}
        />;
      case 'search':
        return <SearchGlobal 
          data={data} 
          fairs={[...INITIAL_FAIRS, ...data.userFairs]}
          onNavigate={(view, fairId) => {
            if (fairId) setCurrentFairId(fairId);
            setCurrentView(view);
          }}
        />;
      case 'settings':
        return <Settings 
          onImport={(content) => {
            if (db.importBackup(content)) {
               setData(db.getData());
               alert('Backup importado correctamente');
            } else {
               alert('Error al importar backup');
            }
          }}
          onExport={db.exportBackup}
          onReset={() => db.clearAll()}
        />;
      default:
        return <div className="p-4">Vista no encontrada</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col pb-20">
      {/* Header */}
      <header className="bg-blue-700 text-white p-4 sticky top-0 z-10 shadow-md flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="font-bold text-lg leading-tight">FairAgenda</h1>
          {currentFair && <span className="text-xs text-blue-100 truncate max-w-[200px]">{currentFair.name}</span>}
        </div>
        <div className="flex gap-2">
           <button onClick={() => setCurrentView('search')} className="p-2 hover:bg-blue-600 rounded">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
           </button>
           <button onClick={() => setCurrentView('settings')} className="p-2 hover:bg-blue-600 rounded">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
           </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-6 overflow-y-auto">
        {renderView()}
      </main>

      {/* Navigation */}
      {currentFairId && (
        <Navigation 
          currentView={currentView} 
          setView={setCurrentView} 
          onExit={handleExitFair}
        />
      )}
    </div>
  );
};

export default App;
