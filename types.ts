export interface EmailSource {
  id: number;
  origem: string;
  dica?: string;
  [key: string]: string | number | undefined;
}

export interface PersistenceConfig {
  enabled: boolean;
  expiryDays: number | null; // null means indeterminate
  timestamp: number;
}

export interface StoredData {
  globalPrefix: string;
  tabPrefixes: Record<number, string>;
  config: PersistenceConfig;
}