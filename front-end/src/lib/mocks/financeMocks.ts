import type { Balance, Transaction } from "../schemas/financeSchemas";
import { CurrentUser, User } from "../schemas/paymentSchemas";

export const MOCK_BALANCE: Balance = {
  balance: 50,
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "a1b2c3d4",
    amount: -50,
    recipient: "Matheus Silva",
    date: new Date(Date.now() - 86400000 * 1), // 1 dia atrás
  },
  {
    id: "e5f6g7h8",
    amount: -75,
    recipient: "Tiago Neves",
    date: new Date(Date.now() - 86400000 * 3), // 3 dias atrás
  },
  {
    id: "i9j0k1l2",
    amount: -10,
    recipient: "Adre Junior",
    date: new Date(Date.now() - 86400000 * 5), // 5 dias atrás
  },
  {
    id: "m3n4o5p6",
    amount: -101,
    recipient: "Tito Testador",
    date: new Date(Date.now() - 86400000 * 7), // 7 dias atrás
  },
];
export const MOCK_USERS: User[] = [
  {
    id: "a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1",
    name: "Ana Beatriz (Aluna)",
    email: "gmbferreira12@getMaxListeners.com",
    role: "STUDENT",
  },
  {
    id: "b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2",
    name: "Bruno Costa (Aluno)",
    email: "gmbferreira12@getMaxListeners.com",
    role: "STUDENT",
  },
  {
    id: "c3c3c3c3-c3c3-c3c3-c3c3-c3c3c3c3c3c3",
    name: "Prof. Carlos (Professor)",
    email: "gmbferreira12@getMaxListeners.com",
    role: "TEACHER",
  },
  {
    id: "d4d4d4d4-d4d4-d4d4-d4d4-d4d4d4d4d4d4",
    name: "Daniela Alves (Aluna)",
    email: "gmbferreira12@getMaxListeners.com",
    role: "STUDENT",
  },
  {
    id: "e5e5e5e5-e5e5-e5e5-e5e5-e5e5e5e5e5e5",
    name: "Eduardo Moreira (Adm)",
    email: "gmbferreira12@getMaxListeners.com",
    role: "ADMIN",
  },
  {
    id: "f6f6f6f6-f6f6-f6f6-f6f6-f6f6f6f6f6f6",
    name: "Fernanda Lima (Aluna)",
    email: "gmbferreira12@getMaxListeners.com",
    role: "STUDENT",
  },
];
export const MOCK_CURRENT_USER: CurrentUser = {
  id: "current-user-id-mock",
  name: "Usuário Logado (Mock)",
  email: "usuario.logado@escola.mock",
  role: "STUDENT",
  balance: 500.0,
};
