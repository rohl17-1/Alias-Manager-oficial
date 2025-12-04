import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface EmailRowProps {
  finalEmail: string;
}

export const EmailRow: React.FC<EmailRowProps> = ({ finalEmail }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(finalEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="flex items-center justify-between p-3 mb-2 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors group">
      <span className="font-mono text-sm sm:text-base text-gray-200 break-all mr-4">
        {finalEmail}
      </span>
      <button
        onClick={handleCopy}
        className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium transition-all ${
          copied
            ? 'bg-green-600 text-white'
            : 'bg-gray-700 text-gray-300 hover:bg-blue-600 hover:text-white group-hover:bg-gray-600 group-hover:hover:bg-blue-600'
        }`}
        title="Copiar email"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
        <span className="hidden sm:inline">{copied ? 'Copiado' : 'Copiar'}</span>
      </button>
    </div>
  );
};