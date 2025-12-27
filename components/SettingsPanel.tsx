import React from 'react';
import { Trash2, Save } from 'lucide-react';
import { PersistenceConfig } from '../types';

interface SettingsPanelProps {
  globalPrefix: string;
  setGlobalPrefix: (val: string) => void;
  config: PersistenceConfig;
  setConfig: (val: PersistenceConfig) => void;
  onClearStorage: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  globalPrefix,
  setGlobalPrefix,
  config,
  setConfig,
  onClearStorage,
}) => {
  return (
    <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 mb-6 border border-gray-700 backdrop-blur-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Global Prefix Input */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
            Complemento Global
          </label>
          <input
            type="text"
            value={globalPrefix}
            onChange={(e) => setGlobalPrefix(e.target.value)}
            placeholder="Ex: 0102"
            className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-600"
          />
          <p className="text-xs text-gray-500">
            Aplicado antes de todos os emails (e antes do complemento da aba).
          </p>
        </div>

        {/* Persistence Controls */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-semibold text-purple-400 uppercase tracking-wider flex items-center gap-2">
              <Save size={16} />
              Persistência
            </label>
            {config.enabled && (
              <button
                onClick={onClearStorage}
                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 hover:underline"
              >
                <Trash2 size={12} /> Limpar tudo
              </button>
            )}
          </div>
          
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 flex flex-col gap-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={config.enabled}
                onChange={(e) => setConfig({ ...config, enabled: e.target.checked })}
                className="w-4 h-4 rounded border-gray-600 text-blue-600 focus:ring-blue-500 bg-gray-800"
              />
              <span className="text-sm text-gray-200">Salvar complementos no dispositivo</span>
            </label>

            {config.enabled && (
              <div className="flex items-center gap-3 pl-7 animate-in fade-in slide-in-from-top-1">
                <select
                  value={config.expiryDays === null ? 'indefinite' : config.expiryDays.toString()}
                  onChange={(e) => {
                    const val = e.target.value;
                    setConfig({
                      ...config,
                      expiryDays: val === 'indefinite' ? null : Number(val),
                    });
                  }}
                  className="bg-gray-800 border border-gray-600 text-xs text-white rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="indefinite">Tempo Indeterminado</option>
                  <option value="1">1 Dia</option>
                  <option value="7">7 Dias</option>
                  <option value="30">30 Dias</option>
                </select>
                <span className="text-xs text-gray-500">Validade dos dados</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};