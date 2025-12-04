import { EmailSource } from './types';

export const INITIAL_DATA: EmailSource[] = [
  {
    "id": 1,
    "origem": "*Apenas Teste-01",
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
    "origem": "*Apenas Teste-02",
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
    "origem": "*Apenas Teste-03",
    "email": "dev.lead@test.com",
    "email2": "dev.frontend@test.com",
    "email3": "dev.backend@test.com"
  },
  {
    "id": 4,
    "origem": "*Apenas Teste-04",
    "dica": "Apenas números autorizados.",
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
    "id": 5,
    "origem": "*Apenas Teste-05",
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
      "id": 6,
      "origem": "K17 - Kalias",
      "dica": "Esta funcionando (ex: 9999).",
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
      "id": 7,
      "origem": "SL-Apoio",
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
      "id": 8,
      "origem": "Outlook ContaDemo",
      "email": "contademo02@outlook.com",
      "email2": "contademo03@outlook.com",
      "email3": "contademo10@outlook.com",
      "email4": "contademorico@outlook.com",
      "email5": "Criação-22/10/2023",
      "email6": "Criar mais lá pra 23/10/2023 ",
      "email7": "Nas duas contas Demos",
      "email8": "...",
      "email9": "...",
      "email10": "..."
    },
    {
      "id": 9,
      "origem": "AnonAddy",
      "email": "4reh6wj7@kanonimo.anonaddy.com",
      "email2": "nja3em6f@kanonimo.anonaddy.com",
      "email3": "y1z7ix1k@anonaddy.me",
      "email4": "2vigv3g1@anonaddy.me",
      "email5": "vc42o4la@anonaddy.me",
      "email6": "0ps7xp2s@anonaddy.me",
      "email7": "2se4u7e1@anonaddy.me",
      "email8": "zh5etdj6@kanonimo.anonaddy.com",
      "email9": "ure9jtnm@kanonimo.anonaddy.com",
      "email10": "sasujvf4@anonaddy.me"
    }
];

export const STORAGE_KEY = 'alias_manager_v1';
export const DEFAULT_EXPIRY_DAYS = 7;