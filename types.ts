export type SourceCategory = 'email' | 'document' | 'cep';

// --- Base Interface ---
export interface BaseSource {
  id: number;
  origem: string;
  category?: SourceCategory; // defaults to 'email' if undefined
  dica?: string;
}

// --- Email Specific ---
export interface EmailSource extends BaseSource {
  category?: 'email';
  [key: string]: string | number | undefined; // For dynamic email keys (email1, email2...)
}

// --- Document Specific ---
export interface DocumentItem {
  type: string;
  number: string;
}

export interface DocumentSource extends BaseSource {
  category: 'document';
  items: DocumentItem[];
}

// --- CEP Specific ---
export interface CepItem {
  dd: string;
  number: string;
}

export interface CepSource extends BaseSource {
  category: 'cep';
  items: CepItem[];
}

// --- Union Type ---
export type DataSource = EmailSource | DocumentSource | CepSource;

// --- Persistence ---
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