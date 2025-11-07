import type { Balance, Transaction } from "../schemas/financeSchemas";

// Dados mockados para o Saldo
export const MOCK_BALANCE: Balance = {
  balance: 50,
};

// Dados mockados para a Lista de Transações
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
