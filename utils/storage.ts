import { StoredData, PersistenceConfig } from '../types';
import { STORAGE_KEY } from '../constants';

export const saveToStorage = (
  globalPrefix: string,
  tabPrefixes: Record<number, string>,
  config: PersistenceConfig
) => {
  if (!config.enabled) {
    localStorage.removeItem(STORAGE_KEY);
    return;
  }

  const data: StoredData = {
    globalPrefix,
    tabPrefixes,
    config: {
      ...config,
      timestamp: Date.now(),
    },
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save to localStorage", e);
  }
};

export const loadFromStorage = (): StoredData | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const data: StoredData = JSON.parse(raw);
    const { config } = data;

    if (!config.enabled) return null;

    // Check expiry
    if (config.expiryDays !== null) {
      const expiryMs = config.expiryDays * 24 * 60 * 60 * 1000;
      if (Date.now() > config.timestamp + expiryMs) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
    }

    return data;
  } catch (e) {
    console.error("Failed to load from localStorage", e);
    return null;
  }
};

export const clearStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
};