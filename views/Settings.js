
import React from 'react';

export default function Settings({ onExport, onImport, onReset }) {
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => onImport(event.target.result);
      reader.readAsText(file);
    }
  };

  return (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-2xl font-black text-slate-800 mb-6">Configuración</h2>
      
      <div className="space-y-6">
        <section>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Seguridad y Datos</h3>
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <button 
              onClick={onExport}
              className="w-full flex items-center gap-4 p-5 hover:bg-slate-50 active:bg-slate-100 transition-colors border-b border-slate-50"
            >
              <div className="bg-blue-100 text-blue-600 p-2 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-800">Exportar Backup</p>
                <p className="text-[10px] text-slate-400 font-medium">Guarda tus datos en un archivo JSON</p>
              </div>
            </button>

            <label className="w-full flex items-center gap-4 p-5 hover:bg-slate-50 active:bg-slate-100 transition-colors border-b border-slate-50 cursor-pointer">
              <div className="bg-emerald-100 text-emerald-600 p-2 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-800">Importar Backup</p>
                <p className="text-[10px] text-slate-400 font-medium">Restaura datos desde un archivo</p>
              </div>
              <input type="file" className="hidden" accept=".json" onChange={handleFile} />
            </label>

            <button 
              onClick={() => { if(confirm('¿ESTÁS SEGURO? Se borrarán todas las ferias, empresas y notas para siempre.')) onReset(); }}
              className="w-full flex items-center gap-4 p-5 hover:bg-red-50 active:bg-red-100 transition-colors"
            >
              <div className="bg-red-100 text-red-600 p-2 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-bold text-red-600">Resetear Aplicación</p>
                <p className="text-[10px] text-red-300 font-medium tracking-tight">Acción irreversible: Borra todo</p>
              </div>
            </button>
          </div>
        </section>

        <section>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Información</h3>
          <div className="bg-slate-100 rounded-3xl p-6 text-center">
             <p className="text-slate-600 font-bold">FairAgenda v1.0.0 Stable</p>
             <p className="text-[10px] text-slate-400 mt-1">100% Privada • 100% Local • 100% Offline</p>
             <div className="mt-6 pt-6 border-t border-slate-200">
                <p className="text-[9px] text-slate-400 leading-relaxed uppercase tracking-widest font-black">
                  Desarrollado para entornos de baja cobertura y alta exigencia profesional.
                </p>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
}
