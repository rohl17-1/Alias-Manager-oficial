import React from 'react';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, label }) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div
          className={`block w-10 h-6 rounded-full transition-colors duration-300 ${
            checked ? 'bg-blue-600' : 'bg-gray-700'
          }`}
        ></div>
        <div
          className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${
            checked ? 'transform translate-x-4' : ''
          }`}
        ></div>
      </div>
      <span className={`text-sm font-medium transition-colors ${checked ? 'text-blue-400' : 'text-gray-400 group-hover:text-gray-300'}`}>
        {label}
      </span>
    </label>
  );
};