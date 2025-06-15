
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AccessibilitySettings {
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
  reducedMotion: boolean;
  screenReaderOptimized: boolean;
  keyboardNavigation: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSettings: (settings: Partial<AccessibilitySettings>) => void;
  announceToScreenReader: (message: string) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider = ({ children }: AccessibilityProviderProps) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem('kiloTakipAccessibility');
    return saved ? JSON.parse(saved) : {
      highContrast: false,
      fontSize: 'medium',
      reducedMotion: false,
      screenReaderOptimized: false,
      keyboardNavigation: true
    };
  });

  const [announcer, setAnnouncer] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create screen reader announcer
    const announcerElement = document.createElement('div');
    announcerElement.setAttribute('aria-live', 'polite');
    announcerElement.setAttribute('aria-atomic', 'true');
    announcerElement.className = 'sr-only';
    document.body.appendChild(announcerElement);
    setAnnouncer(announcerElement);

    return () => {
      if (announcerElement.parentNode) {
        announcerElement.parentNode.removeChild(announcerElement);
      }
    };
  }, []);

  useEffect(() => {
    // Apply accessibility settings to document
    const root = document.documentElement;
    
    // High contrast
    root.classList.toggle('high-contrast', settings.highContrast);
    
    // Font size
    root.classList.remove('font-small', 'font-medium', 'font-large', 'font-xlarge');
    root.classList.add(`font-${settings.fontSize}`);
    
    // Reduced motion
    root.classList.toggle('reduced-motion', settings.reducedMotion);
    
    // Screen reader optimization
    root.classList.toggle('screen-reader-optimized', settings.screenReaderOptimized);
    
    // Save settings
    localStorage.setItem('kiloTakipAccessibility', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    // Keyboard navigation setup
    if (settings.keyboardNavigation) {
      const handleKeydown = (e: KeyboardEvent) => {
        // Tab navigation enhancement
        if (e.key === 'Tab') {
          document.body.classList.add('keyboard-navigation');
        }
        
        // Escape key handling
        if (e.key === 'Escape') {
          const activeElement = document.activeElement as HTMLElement;
          if (activeElement && activeElement.blur) {
            activeElement.blur();
          }
        }
      };

      const handleMousedown = () => {
        document.body.classList.remove('keyboard-navigation');
      };

      document.addEventListener('keydown', handleKeydown);
      document.addEventListener('mousedown', handleMousedown);

      return () => {
        document.removeEventListener('keydown', handleKeydown);
        document.removeEventListener('mousedown', handleMousedown);
      };
    }
  }, [settings.keyboardNavigation]);

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const announceToScreenReader = (message: string) => {
    if (announcer) {
      announcer.textContent = message;
      setTimeout(() => {
        announcer.textContent = '';
      }, 1000);
    }
  };

  return (
    <AccessibilityContext.Provider value={{
      settings,
      updateSettings,
      announceToScreenReader
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

// Accessibility Settings Panel Component
export const AccessibilitySettings = ({ onClose }: { onClose: () => void }) => {
  const { settings, updateSettings } = useAccessibility();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full space-y-4">
        <h2 className="text-xl font-bold mb-4">Erişilebilirlik Ayarları</h2>
        
        <div className="space-y-4">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings.highContrast}
              onChange={(e) => updateSettings({ highContrast: e.target.checked })}
              className="rounded border-gray-300"
            />
            <span>Yüksek Kontrast</span>
          </label>
          
          <div>
            <label className="block text-sm font-medium mb-2">Yazı Boyutu</label>
            <select
              value={settings.fontSize}
              onChange={(e) => updateSettings({ fontSize: e.target.value as any })}
              className="w-full p-2 border rounded-md"
            >
              <option value="small">Küçük</option>
              <option value="medium">Orta</option>
              <option value="large">Büyük</option>
              <option value="xlarge">Çok Büyük</option>
            </select>
          </div>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings.reducedMotion}
              onChange={(e) => updateSettings({ reducedMotion: e.target.checked })}
              className="rounded border-gray-300"
            />
            <span>Azaltılmış Animasyon</span>
          </label>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings.screenReaderOptimized}
              onChange={(e) => updateSettings({ screenReaderOptimized: e.target.checked })}
              className="rounded border-gray-300"
            />
            <span>Ekran Okuyucu Optimizasyonu</span>
          </label>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings.keyboardNavigation}
              onChange={(e) => updateSettings({ keyboardNavigation: e.target.checked })}
              className="rounded border-gray-300"
            />
            <span>Klavye Navigasyonu</span>
          </label>
        </div>
        
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Tamam
          </button>
        </div>
      </div>
    </div>
  );
};
