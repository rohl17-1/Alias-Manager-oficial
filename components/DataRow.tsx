import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface DataRowProps {
  label: string;
  value: string;
  stripFormatting: boolean;
}

export const DataRow: React.FC<DataRowProps> = ({ label, value, stripFormatting }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    // Determine content to copy based on toggle state
    const textToCopy = stripFormatting 
      ? value.replace(/\D/g, '') // Remove all non-digits
      : value; // Keep original formatting

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="flex items-center justify-between p-3 mb-2 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors group">
      <div className="flex items-center gap-4 overflow-hidden">
        <span className="shrink-0 inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-gray-900 border border-gray-700 text-xs font-bold text-gray-400 w-16 text-center">
          {label}
        </span>
        <span className="font-mono text-sm sm:text-base text-gray-200 break-all truncate">
          {/* Always display the original formatted value from JSON */}
          {value}
        </span>
      </div>
      
      <button
        onClick={handleCopy}
        className={`shrink-0 flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium transition-all ml-2 ${
          copied
            ? 'bg-green-600 text-white'
            : 'bg-gray-700 text-gray-300 hover:bg-blue-600 hover:text-white group-hover:bg-gray-600 group-hover:hover:bg-blue-600'
        }`}
        title="Copiar"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
        <span className="hidden sm:inline">{copied ? 'Copiado' : 'Copiar'}</span>
      </button>
    </div>
  );
};