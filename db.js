
const DB_KEY = 'fairagenda_data_v1';

const getEmptyData = () => ({
  userFairs: [], // Added manually by user or from pre-loaded
  favorites: [], // fair IDs
  exhibitors: [],
  meetings: [],
  notes: [],
  tasks: []
});

export const db = {
  saveData: (data) => {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
  },

  getData: () => {
    const data = localStorage.getItem(DB_KEY);
    return data ? JSON.parse(data) : getEmptyData();
  },

  exportBackup: () => {
    const data = localStorage.getItem(DB_KEY);
    const blob = new Blob([data], { type: 'application/json' });
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
      // Basic validation
      if (data && typeof data === 'object') {
        localStorage.setItem(DB_KEY, JSON.stringify(data));
        return true;
      }
      return false;
    } catch (e) {
      console.error("Error importando backup:", e);
      return false;
    }
  },

  clearAll: () => {
    localStorage.removeItem(DB_KEY);
    window.location.reload();
  }
};
