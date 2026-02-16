
import React from 'react';

const Settings = ({ onImport, onExport, onReset }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => onImport(ev.target.result);
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Configuración</h2>
      
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase text-gray-400 tracking-widest">Seguridad y Datos</h3>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <button 
            onClick={onExport}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 border-b border-gray-100"
          >
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg></div>
              <div className="text-left">
                <p className="font-bold">Exportar Backup</p>
                <p className="text-xs text-gray-500">Guarda todos tus datos en un archivo JSON</p>
              </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
          
          <label className="w-full flex items-center justify-between p-4 hover:bg-gray-50 border-b border-gray-100 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg></div>
              <div className="text-left">
                <p className="font-bold">Importar Backup</p>
                <p className="text-xs text-gray-500">Restaura datos desde un archivo previo</p>
              </div>
            </div>
            <input type="file" className="hidden" accept=".json" onChange={handleFileChange} />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </label>

          <button 
            onClick={() => { if(confirm('¿BORRAR TODO? Esta acción es irreversible.')) onReset(); }}
            className="w-full flex items-center justify-between p-4 hover:bg-red-50"
          >
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-lg text-red-600"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></div>
              <div className="text-left">
                <p className="font-bold text-red-600">Borrar Todos los Datos</p>
                <p className="text-xs text-gray-500">Limpia la base de datos local por completo</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase text-gray-400 tracking-widest">Sobre FairAgenda</h3>
        <div className="bg-gray-100 p-6 rounded-xl text-center">
           <p className="font-bold text-gray-700">Versión 1.0.0 Stable</p>
           <p className="text-sm text-gray-500 mt-2">App local y privada. Los datos nunca salen de tu dispositivo.</p>
           <p className="text-xs text-gray-400 mt-6">Diseñada para funcionar sin conexión.</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
