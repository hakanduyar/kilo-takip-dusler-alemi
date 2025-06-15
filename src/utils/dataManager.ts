
interface AppData {
  user: any;
  program: any;
  progress: any;
  profile: any;
  notifications: any[];
  onboardingCompleted: boolean;
  exportDate: string;
  version: string;
}

export const exportData = (): string => {
  const data: AppData = {
    user: JSON.parse(localStorage.getItem('kiloTakipUser') || '{}'),
    program: JSON.parse(localStorage.getItem('kiloTakipProgram') || 'null'),
    progress: JSON.parse(localStorage.getItem('kiloTakipProgress') || 'null'),
    profile: JSON.parse(localStorage.getItem('kiloTakipProfile') || '{}'),
    notifications: JSON.parse(localStorage.getItem('kiloTakipNotifications') || '[]'),
    onboardingCompleted: localStorage.getItem('kiloTakipOnboardingCompleted') === 'true',
    exportDate: new Date().toISOString(),
    version: '1.0.0'
  };

  return JSON.stringify(data, null, 2);
};

export const importData = (jsonData: string): { success: boolean; message: string } => {
  try {
    const data: AppData = JSON.parse(jsonData);

    // Validate data structure
    if (!data.version || !data.exportDate) {
      throw new Error('Geçersiz veri formatı');
    }

    // Create backup before importing
    createBackup();

    // Import data
    if (data.user && Object.keys(data.user).length > 0) {
      localStorage.setItem('kiloTakipUser', JSON.stringify(data.user));
    }
    
    if (data.program) {
      localStorage.setItem('kiloTakipProgram', JSON.stringify(data.program));
    }
    
    if (data.progress) {
      localStorage.setItem('kiloTakipProgress', JSON.stringify(data.progress));
    }
    
    if (data.profile && Object.keys(data.profile).length > 0) {
      localStorage.setItem('kiloTakipProfile', JSON.stringify(data.profile));
    }
    
    if (data.notifications && data.notifications.length > 0) {
      localStorage.setItem('kiloTakipNotifications', JSON.stringify(data.notifications));
    }
    
    if (data.onboardingCompleted) {
      localStorage.setItem('kiloTakipOnboardingCompleted', 'true');
    }

    return { success: true, message: 'Veriler başarıyla içe aktarıldı!' };
  } catch (error) {
    return { success: false, message: 'Veri içe aktarma hatası: ' + (error as Error).message };
  }
};

export const createBackup = (): void => {
  const backupData = exportData();
  const timestamp = new Date().toISOString().split('T')[0];
  localStorage.setItem(`kiloTakipBackup_${timestamp}`, backupData);
};

export const getBackups = (): { date: string; data: string }[] => {
  const backups: { date: string; data: string }[] = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('kiloTakipBackup_')) {
      const date = key.replace('kiloTakipBackup_', '');
      const data = localStorage.getItem(key) || '';
      backups.push({ date, data });
    }
  }
  
  return backups.sort((a, b) => b.date.localeCompare(a.date));
};

export const restoreBackup = (backupData: string): { success: boolean; message: string } => {
  return importData(backupData);
};

export const clearAllData = (): void => {
  const keys = [
    'kiloTakipUser',
    'kiloTakipProgram',
    'kiloTakipProgress',
    'kiloTakipProfile',
    'kiloTakipNotifications',
    'kiloTakipOnboardingCompleted'
  ];
  
  keys.forEach(key => localStorage.removeItem(key));
};

export const downloadDataAsFile = (data: string, filename: string): void => {
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const syncData = (): { lastSync: string; status: 'success' | 'error' } => {
  try {
    // Simulate data sync (in a real app, this would sync with a server)
    const timestamp = new Date().toISOString();
    localStorage.setItem('kiloTakipLastSync', timestamp);
    
    return { lastSync: timestamp, status: 'success' };
  } catch (error) {
    return { lastSync: '', status: 'error' };
  }
};
