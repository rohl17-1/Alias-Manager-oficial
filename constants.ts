import { DataSource } from './types';

export const INITIAL_DATA: DataSource[] = [
  {
    "id": 1,
    "category": "email",
    "origem": "K17 - Kalias",
    "dica": "Utilize o código do chamado (ex: 9999).",
    "email": "email01@gmail.com",
    "email2": "email02@gmail.com",
    "email3": "email03@gmail.com",
    "email4": "email04@gmail.com",
    "email5": "email05@gmail.com",
    "email6": "email06@gmail.com",
    "email7": "email07@gmail.com",
    "email8": "email08@gmail.com",
    "email9": "email09@gmail.com",
    "email10": "email10@gmail.com"
  },
  {
    "id": 2,
    "category": "email",
    "origem": "SL-Apoio",
    "dica": "Prefixo de setor necessário (ex: FIN-).",
    "email": "support@gmail.com",
    "email2": "billing@gmail.com",
    "email3": "tech@gmail.com",
    "email4": "admin@gmail.com",
    "email5": "info@gmail.com",
    "email6": "contact@gmail.com",
    "email7": "returns@gmail.com",
    "email8": "sales@gmail.com",
    "email9": "hr@gmail.com",
    "email10": "marketing@gmail.com"
  },
  {
    "id": 3,
    "category": "email",
    "origem": "Dev-Team",
    "email": "dev.lead@test.com",
    "email2": "dev.frontend@test.com",
    "email3": "dev.backend@test.com"
  },
  {
    "id": 7,
    "category": "document",
    "origem": "Documentos",
    "items": [
      { "type": "CPF", "number": "248.000.724-33" },
      { "type": "RG", "number": "12.345.678-9" },
      { "type": "CNPJ", "number": "12.345.678/0001-90" },
      { "type": "CNPJ", "number": "17.345.678/0001-90" },
      { "type": "CNH", "number": "12345678900" }
    ]
  },
  {
    "id": 8,
    "category": "cep",
    "origem": "Endereços (CEPs)",
    "items": [
      { "dd": "27", "number": "29100-000" },
      { "dd": "11", "number": "01001-000" },
      { "dd": "21", "number": "20040-002" },
      { "dd": "31", "number": "30140-071" }
    ]
  }
];

export const STORAGE_KEY = 'alias_manager_v1';
export const DEFAULT_EXPIRY_DAYS = 7;