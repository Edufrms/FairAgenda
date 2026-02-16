
const DB_KEY = 'fairagenda_storage_v1';

const getEmptyData = () => ({
  userFairs: [],
  favorites: [],
  exhibitors: [],
  meetings: [],
  notes: [],
  tasks: []
});

export const db = {
  saveData: (data) => {
    try {
      localStorage.setItem(DB_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Error guardando datos localmente:", e);
    }
  },

  getData: () => {
    const data = localStorage.getItem(DB_KEY);
    return data ? JSON.parse(data) : getEmptyData();
  },

  exportBackup: (data) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FairAgenda_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  importBackup: (fileContent) => {
    try {
      const data = JSON.parse(fileContent);
      if (data && typeof data === 'object' && data.exhibitors) {
        return data;
      }
      return null;
    } catch (e) {
      console.error("Error al procesar el archivo de backup:", e);
      return null;
    }
  },

  clearAll: () => {
    localStorage.removeItem(DB_KEY);
    window.location.reload();
  }
};
