import React, { useState, useEffect, useMemo } from 'react';
import { HelpCircle, Lightbulb } from 'lucide-react';
import { INITIAL_DATA } from './constants';
import { PersistenceConfig } from './types';
import { saveToStorage, loadFromStorage, clearStorage } from './utils/storage';
import { TabList } from './components/TabList';
import { SettingsPanel } from './components/SettingsPanel';
import { EmailRow } from './components/EmailRow';
import { InstructionsModal } from './components/InstructionsModal';

const App: React.FC = () => {
  // --- State ---
  const [data] = useState(INITIAL_DATA);
  const [activeTabId, setActiveTabId] = useState<number>(data[0]?.id || 1);
  const [globalPrefix, setGlobalPrefix] = useState<string>('');
  const [tabPrefixes, setTabPrefixes] = useState<Record<number, string>>({});
  const [config, setConfig] = useState<PersistenceConfig>({
    enabled: false,
    expiryDays: null,
    timestamp: Date.now(),
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Effects ---

  // Load from localStorage on mount
  useEffect(() => {
    const stored = loadFromStorage();
    if (stored) {
      setGlobalPrefix(stored.globalPrefix);
      setTabPrefixes(stored.tabPrefixes);
      setConfig(stored.config);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when relevant state changes
  useEffect(() => {
    if (!isLoaded) return;
    saveToStorage(globalPrefix, tabPrefixes, config);
  }, [globalPrefix, tabPrefixes, config, isLoaded]);

  // --- Helpers ---

  const handleTabPrefixChange = (val: string) => {
    setTabPrefixes((prev) => ({
      ...prev,
      [activeTabId]: val,
    }));
  };

  const handleClearStorage = () => {
    clearStorage();
    setGlobalPrefix('');
    setTabPrefixes({});
    setConfig({ enabled: false, expiryDays: null, timestamp: Date.now() });
  };

  const activeItem = data.find((d) => d.id === activeTabId);

  // Extract emails for the current active tab
  const activeEmails = useMemo(() => {
    if (!activeItem) return [];

    // Filter keys that look like 'email', 'email2', etc.
    return Object.entries(activeItem)
      .filter(([key, value]) => key.startsWith('email') && typeof value === 'string')
      // Sort roughly by number suffix (email < email2 < email10)
      .sort(([keyA], [keyB]) => {
        const numA = parseInt(keyA.replace('email', '') || '1', 10);
        const numB = parseInt(keyB.replace('email', '') || '1', 10);
        return numA - numB;
      })
      .map(([_, value]) => value as string);
  }, [activeItem]);

  const activeTabPrefix = tabPrefixes[activeTabId] || '';

  // --- Render ---

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 flex justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-4xl flex flex-col">
        
        {/* Header */}
        <header className="mb-8 mt-2 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-100 to-gray-500 bg-clip-text text-transparent">
              Alias Manager
            </h1>
            <p className="text-gray-500 mt-1 text-sm">Gerenciador de emails e prefixos</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="p-2 text-gray-400 hover:text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-colors"
            title="Como usar"
          >
            <HelpCircle size={24} />
          </button>
        </header>

        {/* Global Controls */}
        <SettingsPanel
          globalPrefix={globalPrefix}
          setGlobalPrefix={setGlobalPrefix}
          config={config}
          setConfig={setConfig}
          onClearStorage={handleClearStorage}
        />

        {/* Tab Navigation */}
        <TabList
          data={data}
          activeTabId={activeTabId}
          onSelectTab={setActiveTabId}
        />

        {/* Tab Specific Content */}
        <main className="flex-1 bg-[#0a0a0a] rounded-3xl p-6 sm:p-8 border border-gray-800 shadow-2xl relative overflow-hidden">
          
          {/* Subtle background gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-900/5 rounded-full blur-3xl -z-10 pointer-events-none" />

          <div className="flex flex-col gap-6">
            
            {/* Tab Specific Input */}
            <div>
              <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 block">
                Complemento da Tab <span className="text-blue-500">({activeItem?.origem})</span>
              </label>
              <input
                type="text"
                value={activeTabPrefix}
                onChange={(e) => handleTabPrefixChange(e.target.value)}
                placeholder="Digite o prefixo específico desta lista... Ex: 2354"
                className="w-full bg-[#111] border border-gray-800 text-white px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all placeholder-gray-700 text-lg"
              />
              
              {/* Tip / Dica Section */}
              {activeItem?.dica && (
                <div className="mt-3 flex items-start gap-3 text-sm text-amber-400/90 bg-amber-900/10 p-3 rounded-xl border border-amber-900/30">
                  <Lightbulb size={18} className="shrink-0 mt-0.5" />
                  <span><strong className="font-semibold text-amber-300">Dica:</strong> {activeItem.dica}</span>
                </div>
              )}

              {!activeItem?.dica && (
                 <p className="text-xs text-gray-600 mt-3 ml-1">
                  Este prefixo será adicionado apenas aos emails desta lista.
                </p>
              )}
            </div>

            {/* Preview of construction rule */}
            <div className="bg-gray-900/50 p-4 rounded-2xl border border-dashed border-gray-800 text-xs font-mono text-gray-400 flex items-center flex-wrap gap-2">
              <span className="text-gray-500 font-sans font-semibold mr-2">PREVIEW:</span>
              <span className="bg-purple-900/20 text-purple-300 px-2 py-1 rounded-md border border-purple-500/20">{globalPrefix || '[Global]'}</span>
              <span className="text-gray-600">+</span>
              <span className="bg-blue-900/20 text-blue-300 px-2 py-1 rounded-md border border-blue-500/20">{activeTabPrefix || '[Tab]'}</span>
              <span className="text-gray-600">+</span>
              <span className="text-gray-300 px-1">[Email]</span>
            </div>

            <div className="h-px bg-gray-800/50 my-2" />

            {/* Email List */}
            <div className="flex flex-col gap-2">
              {activeEmails.length > 0 ? (
                activeEmails.map((email, idx) => {
                  const finalEmail = `${globalPrefix}${activeTabPrefix}${email}`;
                  return (
                    <EmailRow key={`${activeTabId}-${idx}`} finalEmail={finalEmail} />
                  );
                })
              ) : (
                <div className="text-center py-12 text-gray-600">
                  <p>Nenhum email encontrado para esta origem.</p>
                </div>
              )}
            </div>
          </div>
        </main>

        <footer className="mt-8 text-center text-gray-700 text-sm pb-8">
          &copy; {new Date().getFullYear()} Alias Manager. All rights reserved.. Git Roh...
        </footer>
      </div>

      <InstructionsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;