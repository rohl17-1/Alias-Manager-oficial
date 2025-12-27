import React, { useState, useEffect, useMemo } from 'react';
import { HelpCircle, Lightbulb, FileText, MapPin, Mail } from 'lucide-react';
import { INITIAL_DATA } from './constants';
import { PersistenceConfig, DataSource, DocumentSource, CepSource } from './types';
import { saveToStorage, loadFromStorage, clearStorage } from './utils/storage';
import { TabList } from './components/TabList';
import { SettingsPanel } from './components/SettingsPanel';
import { EmailRow } from './components/EmailRow';
import { DataRow } from './components/DataRow';
import { ToggleSwitch } from './components/ToggleSwitch';
import { InstructionsModal } from './components/InstructionsModal';

const App: React.FC = () => {
  // --- State ---
  const [data] = useState<DataSource[]>(INITIAL_DATA);
  const [activeTabId, setActiveTabId] = useState<number>(data[0]?.id || 1);
  const [globalPrefix, setGlobalPrefix] = useState<string>('');
  const [tabPrefixes, setTabPrefixes] = useState<Record<number, string>>({});
  const [config, setConfig] = useState<PersistenceConfig>({
    enabled: false,
    expiryDays: null,
    timestamp: Date.now(),
  });
  const [stripFormatting, setStripFormatting] = useState(false);
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
  const activeCategory = activeItem?.category || 'email';
  const activeTabPrefix = tabPrefixes[activeTabId] || '';

  // Extract items based on category
  const activeEmails = useMemo(() => {
    if (activeCategory !== 'email' || !activeItem) return [];
    
    // Filter keys that look like 'email', 'email2', etc.
    return Object.entries(activeItem)
      .filter(([key, value]) => key.startsWith('email') && typeof value === 'string')
      .sort(([keyA], [keyB]) => {
        const numA = parseInt(keyA.replace('email', '') || '1', 10);
        const numB = parseInt(keyB.replace('email', '') || '1', 10);
        return numA - numB;
      })
      .map(([_, value]) => value as string);
  }, [activeItem, activeCategory]);

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
            <p className="text-gray-500 mt-1 text-sm">Gerenciador de dados e prefixos</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="p-2 text-gray-400 hover:text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-colors"
            title="Como usar"
          >
            <HelpCircle size={24} />
          </button>
        </header>

        {/* Global Controls - Only show for Emails */}
        {activeCategory === 'email' && (
          <SettingsPanel
            globalPrefix={globalPrefix}
            setGlobalPrefix={setGlobalPrefix}
            config={config}
            setConfig={setConfig}
            onClearStorage={handleClearStorage}
          />
        )}

        {/* Tab Navigation */}
        <TabList
          data={data}
          activeTabId={activeTabId}
          onSelectTab={setActiveTabId}
        />

        {/* Main Content Area */}
        <main className="flex-1 bg-[#0a0a0a] rounded-3xl p-6 sm:p-8 border border-gray-800 shadow-2xl relative overflow-hidden">
          
          {/* Background decoration based on category */}
          <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -z-10 pointer-events-none opacity-20
            ${activeCategory === 'email' ? 'bg-blue-900' : 
              activeCategory === 'document' ? 'bg-emerald-900' : 'bg-orange-900'}`} 
          />

          <div className="flex flex-col gap-6">
            
            {/* --- EMAIL CATEGORY LAYOUT --- */}
            {activeCategory === 'email' && (
              <>
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
                  
                  {activeItem?.dica && (
                    <div className="mt-3 flex items-start gap-3 text-sm text-amber-400/90 bg-amber-900/10 p-3 rounded-xl border border-amber-900/30">
                      <Lightbulb size={18} className="shrink-0 mt-0.5" />
                      <span><strong className="font-semibold text-amber-300">Dica:</strong> {activeItem.dica}</span>
                    </div>
                  )}
                </div>

                {/* Preview */}
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
              </>
            )}

            {/* --- DOCUMENT & CEP CATEGORY LAYOUT --- */}
            {(activeCategory === 'document' || activeCategory === 'cep') && (
              <>
                 <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {activeCategory === 'document' ? (
                        <FileText className="text-emerald-500" size={24} />
                      ) : (
                        <MapPin className="text-orange-500" size={24} />
                      )}
                      <h2 className="text-xl font-bold text-gray-200">{activeItem?.origem}</h2>
                    </div>

                    <ToggleSwitch 
                      label="Sem Pontuação" 
                      checked={stripFormatting} 
                      onChange={setStripFormatting} 
                    />
                 </div>

                 {activeCategory === 'document' && 'items' in activeItem! && (
                    <div className="flex flex-col gap-2">
                      {(activeItem as DocumentSource).items.map((doc, idx) => (
                        <DataRow 
                          key={idx} 
                          label={doc.type} 
                          value={doc.number} 
                          stripFormatting={stripFormatting} 
                        />
                      ))}
                    </div>
                 )}

                {activeCategory === 'cep' && 'items' in activeItem! && (
                    <div className="flex flex-col gap-2">
                      {(activeItem as CepSource).items.map((cep, idx) => (
                        <DataRow 
                          key={idx} 
                          label={`DDD ${cep.dd}`} 
                          value={cep.number} 
                          stripFormatting={stripFormatting} 
                        />
                      ))}
                    </div>
                 )}
              </>
            )}

          </div>
        </main>

        <footer className="mt-8 pb-8 text-center">
          <p className="text-gray-700 text-sm">
            &copy; {new Date().getFullYear()} Alias Manager. All rights reserved. Git Roh...
          </p>
          <div className="mt-4 mx-auto max-w-2xl bg-gray-900/40 p-3 rounded-lg border border-gray-800/50">
             <p className="text-[10px] text-gray-600 leading-relaxed uppercase tracking-wide">
               <strong>Aviso Legal:</strong> Os documentos (CPF, RG, CNPJ) e endereços exibidos nesta aplicação são fictícios, 
               gerados aleatoriamente por ferramentas de teste de software. Eles não pertencem a pessoas reais 
               e não possuem validade jurídica e qualquer coincidência com dados reais é mera coincidência. Utilize apenas para fins de desenvolvimento e testes.
             </p>
          </div>
        </footer>
      </div>

      <InstructionsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;