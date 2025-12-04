import React from 'react';
import { X, Save, Layers, Hash } from 'lucide-react';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-[#111] border border-gray-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 relative"
        role="dialog"
        aria-modal="true"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white bg-gray-900 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Como usar o Gerenciador
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-purple-900/30 flex items-center justify-center text-purple-400">
                <Layers size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-200 text-lg">Complemento Global</h3>
                <p className="text-gray-500 text-sm leading-relaxed mt-1">
                  Texto adicionado ao início de <strong>todos</strong> os emails, independentemente da aba selecionada.
                </p>
                <div className="mt-2 text-xs font-mono bg-gray-900/50 p-2 rounded text-purple-300 border border-purple-500/10">
                  [Global] + [Tab] + [Email]
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-900/30 flex items-center justify-center text-blue-400">
                <Hash size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-200 text-lg">Complemento da Tab</h3>
                <p className="text-gray-500 text-sm leading-relaxed mt-1">
                  Texto específico para a lista atual. Cada aba (origem) pode ter seu próprio prefixo numérico ou textual.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-green-900/30 flex items-center justify-center text-green-400">
                <Save size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-200 text-lg">Persistência</h3>
                <p className="text-gray-500 text-sm leading-relaxed mt-1">
                  Ative o checkbox de persistência para salvar seus prefixos no dispositivo. Você pode configurar uma validade automática (ex: 7 dias) para segurança.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 p-4 flex justify-end border-t border-gray-800">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-black font-semibold rounded-xl hover:bg-white transition-colors"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
};