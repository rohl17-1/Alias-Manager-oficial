import { DataSource } from './types';

export const INITIAL_DATA: DataSource[] = [
  {
    "id": 1,
    "category": "email",
    "origem": "Apenas Teste-01",
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
    "origem": "Apenas Teste-02",
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
    "origem": "K*7 - Kalias",
    "dica": "Utilize o código do chamado (ex: 9999).",
    "email": "contaapp@cod.aleeas.com",
    "email2": "emailtempor@cod.slmail.me",
    "email3": "emailtemporario@cod.aleeas.com",
    "email4": "redesocial@cod.aleeas.com",
    "email5": "redesocial01@cod.aleeas.com",
    "email6": "lixo@cod.slmail.me",
    "email7": "kowalski@cod.aleeas.com",
    "email8": "capitao@cod.aleeas.com",
    "email9": "recruta@cod.aleeas.com",
    "email10": "rico@cod.aleeas.com"
  },
  {
    "id": 3,
    "category": "email",
    "origem": "SL-Apoio",
    "dica": "Utilize o código do chamado (ex: 9999).",
    "email": "tiktokconta@vintage.aleeas.com",
    "email2": "conta02@falaserio.slmail.me",
    "email3": "conta03@vintage.aleeas.com",
    "email4": "conta04@kanonimo.slmail.me",
    "email5": "conta05@astuto.aleeas.com",
    "email6": "conta06@invadindo.aleeas.com",
    "email7": "rico@vintage.aleeas.com",
    "email8": "sotestando@vintage.aleeas.com",
    "email9": "conta01@vintage.aleeas.com",
    "email10": "audaz@astuto.aleeas.com"
  },
  {
    "id": 7,
    "category": "document",
    "origem": "Documentos",
    "items": [
      { "type": "CPF", "number": "427.132.390-01" },
      { "type": "RG", "number": "12.345.678-9" },
      { "type": "CNPJ", "number": "25.302.775/0001-42" },
      { "type": "CNH", "number": "19.746.500/0001-03" },
      { "type": "TEL", "number": "(71)98369-5568" },
      { "type": "CPF", "number": "22497072227" },
      { "type": "RG", "number": "47.677.462-7" },
      { "type": "CNPJ", "number": "39.733.272/0001-36" },
      { "type": "CNH", "number": "56356064578" },
      { "type": "TELL", "number": "(21) 98336-9514" },
      { "type": "CPF", "number": "021,754,317-03" },
      { "type": "RG", "number": "12.345.678/0001-90" },
      { "type": "CNPJ", "number": "37.202.552/0001-92" },
      { "type": "CNH", "number": "00598161653" },
      { "type": "CNH", "Site": "https://www.4devs.com.br/gerador_de_pessoas"},
      { "type": "CNH", "Site": "https://geradornv.com.br/gerador-celular/"}
    ]
  },
  {
    "id": 8,
    "category": "cep",
    "origem": "Endereços (CEPs)",
    "items": [
      { "dd": "21", "number": "23042-110" },
      { "dd": "11", "number": "03359-025" },
      { "dd": "21", "number": "20040-002" },
      { "dd": "73", "number": "44046-000" },
      { "dd": "87", "number": "54100-656" },
      { "dd": "37", "number": "38184-114" },
      { "dd": "21", "number": "21735-210" },
      { "dd": "27", "number": "29172-680" },
      { "dd": "73", "number": "45830-408" }
    ]
  }
];

export const STORAGE_KEY = 'alias_manager_v1';
export const DEFAULT_EXPIRY_DAYS = 7;
