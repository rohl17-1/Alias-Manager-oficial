import React, { useRef, useEffect } from 'react';
import { DataSource } from '../types';

interface TabListProps {
  data: DataSource[];
  activeTabId: number;
  onSelectTab: (id: number) => void;
}

export const TabList: React.FC<TabListProps> = ({ data, activeTabId, onSelectTab }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll to active tab
  useEffect(() => {
    if (activeTabRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const tab = activeTabRef.current;
      
      const tabLeft = tab.offsetLeft;
      const tabWidth = tab.offsetWidth;
      const containerWidth = container.offsetWidth;
      const scrollLeft = container.scrollLeft;

      if (tabLeft < scrollLeft || tabLeft + tabWidth > scrollLeft + containerWidth) {
        container.scrollTo({
          left: tabLeft - containerWidth / 2 + tabWidth / 2,
          behavior: 'smooth',
        });
      }
    }
  }, [activeTabId]);

  return (
    <div className="w-full mb-6 border-b border-gray-700/50">
      <div 
        ref={scrollContainerRef}
        className="flex gap-2 overflow-x-auto pb-4 px-1 scrollbar-hide no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {data.map((item) => {
          const isActive = item.id === activeTabId;
          return (
            <button
              key={item.id}
              ref={isActive ? activeTabRef : null}
              onClick={() => onSelectTab(item.id)}
              className={`
                whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border
                ${isActive 
                  ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-900/50' 
                  : 'bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-750 hover:text-gray-200'
                }
              `}
            >
              {item.origem}
            </button>
          );
        })}
      </div>
    </div>
  );
};