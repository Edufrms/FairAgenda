
import React, { useState, useEffect, useMemo } from 'react';
import { db } from './db.js';
import { INITIAL_FAIRS } from './constants.js';

// Vistas
import FairSelector from './views/FairSelector.js';
import Dashboard from './views/Dashboard.js';
import ExhibitorList from './views/ExhibitorList.js';
import MeetingList from './views/MeetingList.js';
import TaskList from './views/TaskList.js';
import NoteList from './views/NoteList.js';
import Settings from './views/Settings.js';
import SearchGlobal from './views/SearchGlobal.js';

// Componentes
import Navigation from './components/Navigation.js';

export default function App() {
  const [data, setData] = useState(() => db.getData());
  const [currentFairId, setCurrentFairId] = useState(null);
  const [currentView, setCurrentView] = useState('selector');

  // Guardar automáticamente en cada cambio
  useEffect(() => {
    db.saveData(data);
  }, [data]);

  const allFairs = useMemo(() => [...INITIAL_FAIRS, ...data.userFairs], [data.userFairs]);
  const currentFair = useMemo(() => allFairs.find(f => f.id === currentFairId), [currentFairId, allFairs]);

  // Handlers Globales
  const handleSelectFair = (id) => {
    setCurrentFairId(id);
    setCurrentView('dashboard');
  };

  const handleUpdateCollection = (key, item) => {
    setData(prev => {
      const collection = prev[key];
      const exists = collection.find(i => i.id === item.id);
      return {
        ...prev,
        [key]: exists 
          ? collection.map(i => i.id === item.id ? { ...item, updatedAt: new Date().toISOString() } : i)
          : [...collection, { ...item, id: item.id || Date.now().toString(), createdAt: new Date().toISOString() }]
      };
    });
  };

  const handleDeleteItem = (key, id) => {
    if (confirm('¿Confirmas que quieres eliminar este elemento?')) {
      setData(prev => ({
        ...prev,
        [key]: prev[key].filter(i => i.id !== id)
      }));
    }
  };

  const handleToggleFavorite = (fairId) => {
    setData(prev => ({
      ...prev,
      favorites: prev.favorites.includes(fairId)
        ? prev.favorites.filter(id => id !== fairId)
        : [...prev.favorites, fairId]
    }));
  };

  // Renderizado dinámico de vistas
  const renderContent = () => {
    if (!currentFairId && currentView !== 'settings' && currentView !== 'search') {
      return (
        <FairSelector 
          fairs={allFairs} 
          favorites={data.favorites} 
          onSelect={handleSelectFair}
          onToggleFavorite={handleToggleFavorite}
          onAddFair={(newFair) => handleUpdateCollection('userFairs', newFair)}
        />
      );
    }

    switch (currentView) {
      case 'selector':
        return (
          <FairSelector 
            fairs={allFairs} 
            favorites={data.favorites} 
            onSelect={handleSelectFair}
            onToggleFavorite={handleToggleFavorite}
            onAddFair={(newFair) => handleUpdateCollection('userFairs', newFair)}
          />
        );
      case 'dashboard':
        return <Dashboard fair={currentFair} data={data} setView={setCurrentView} />;
      case 'exhibitors':
        return (
          <ExhibitorList 
            fairId={currentFairId} 
            exhibitors={data.exhibitors.filter(e => e.fairId === currentFairId)}
            onSave={(item) => handleUpdateCollection('exhibitors', { ...item, fairId: currentFairId })}
            onDelete={(id) => handleDeleteItem('exhibitors', id)}
          />
        );
      case 'meetings':
        return (
          <MeetingList 
            fairId={currentFairId}
            meetings={data.meetings.filter(m => m.fairId === currentFairId)}
            exhibitors={data.exhibitors.filter(e => e.fairId === currentFairId)}
            onSave={(item) => handleUpdateCollection('meetings', { ...item, fairId: currentFairId })}
            onDelete={(id) => handleDeleteItem('meetings', id)}
          />
        );
      case 'tasks':
        return (
          <TaskList 
            fairId={currentFairId}
            tasks={data.tasks.filter(t => t.fairId === currentFairId)}
            exhibitors={data.exhibitors.filter(e => e.fairId === currentFairId)}
            onSave={(item) => handleUpdateCollection('tasks', { ...item, fairId: currentFairId })}
            onDelete={(id) => handleDeleteItem('tasks', id)}
            onToggle={(id) => {
              const task = data.tasks.find(t => t.id === id);
              handleUpdateCollection('tasks', { ...task, completed: !task.completed });
            }}
          />
        );
      case 'notes':
        return (
          <NoteList 
            fairId={currentFairId}
            notes={data.notes.filter(n => n.fairId === currentFairId)}
            exhibitors={data.exhibitors.filter(e => e.fairId === currentFairId)}
            onSave={(item) => handleUpdateCollection('notes', { ...item, fairId: currentFairId })}
            onDelete={(id) => handleDeleteItem('notes', id)}
          />
        );
      case 'search':
        return (
          <SearchGlobal 
            data={data} 
            fairs={allFairs}
            onNavigate={(view, fairId) => {
              if (fairId) setCurrentFairId(fairId);
              setCurrentView(view);
            }}
          />
        );
      case 'settings':
        return (
          <Settings 
            onExport={() => db.exportBackup(data)}
            onImport={(content) => {
              const importedData = db.importBackup(content);
              if (importedData) {
                setData(importedData);
                alert('Backup restaurado con éxito');
              } else {
                alert('Archivo no válido');
              }
            }}
            onReset={db.clearAll}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-slate-50 relative">
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex flex-col overflow-hidden">
          <h1 className="text-xl font-black text-slate-800 tracking-tight leading-none">FairAgenda</h1>
          {currentFair && (
            <span className="text-[10px] text-blue-600 font-bold uppercase truncate mt-1">
              {currentFair.name}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setCurrentView('search')}
            className="p-2 text-slate-400 hover:text-slate-600 active:scale-95 transition-transform"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button 
            onClick={() => setCurrentView('settings')}
            className="p-2 text-slate-400 hover:text-slate-600 active:scale-95 transition-transform"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 pb-28">
        {renderContent()}
      </main>

      {currentFairId && (
        <Navigation 
          currentView={currentView} 
          setView={setCurrentView} 
          onExit={() => {
            setCurrentFairId(null);
            setCurrentView('selector');
          }}
        />
      )}
    </div>
  );
}
