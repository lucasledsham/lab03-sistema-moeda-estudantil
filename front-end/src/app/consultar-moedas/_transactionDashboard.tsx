"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { cn } from "@/lib/utils";
import {
  Balance,
  balanceSchema,
  Transaction,
  transactionListSchema,
} from "@/lib/schemas/financeSchemas";

import { MOCK_BALANCE, MOCK_TRANSACTIONS } from "@/lib/mocks/financeMocks";
import { AlertTriangle, Coins } from "lucide-react";

//TODO-- Arrumar a url da api
const API_BASE_URL = "http://localhost:9090";
const BALANCE_API_ROUTE = `${API_BASE_URL}/moeda/balance`;
const TRANSACTIONS_API_ROUTE = `${API_BASE_URL}/moeda/transactions`;

function formatNumber(amount: number) {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function StudentCurrencyDisplay({ amount }: { amount: number }) {
  const isNegative = amount < 0;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1",
        isNegative ? "text-red-600" : "text-green-700"
      )}
    >
      <Coins className="h-4 w-4" />
      {formatNumber(amount)}
    </span>
  );
}
export function TransactionDashboard() {
  const [balance, setBalance] = useState<Balance | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMockData, setIsMockData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsMockData(false);
      try {
        const token = localStorage.getItem("authToken");
        const headersObj: HeadersInit = token
          ? { Authorization: `Bearer ${token}` }
          : {};

        const [balanceRes, transactionsRes] = await Promise.all([
          fetch(BALANCE_API_ROUTE, { headers: headersObj }),
          fetch(TRANSACTIONS_API_ROUTE, { headers: headersObj }),
        ]);

        if (!balanceRes.ok || !transactionsRes.ok) {
          throw new Error("Falha de rede ou resposta não-OK da API.");
        }

        const balanceData = await balanceRes.json();
        const transactionsData = await transactionsRes.json();

        const validatedBalance = balanceSchema.parse(balanceData);
        const validatedTransactions =
          transactionListSchema.parse(transactionsData);

        setBalance(validatedBalance);
        setTransactions(
          validatedTransactions.sort(
            (a, b) => b.date.getTime() - a.date.getTime()
          )
        );
      } catch (err) {
        console.warn(
          "API falhou. Carregando dados mockados como fallback.",
          err
        );

        setBalance(MOCK_BALANCE);
        setTransactions(MOCK_TRANSACTIONS);
        setIsMockData(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="p-4">Carregando dados financeiros...</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      {isMockData && (
        <Card className="bg-yellow-50 border-yellow-300">
          <CardContent className="p-4 flex items-center space-x-3">
            <AlertTriangle className="text-yellow-600 h-5 w-5" />
            <div>
              <p className="font-semibold text-yellow-800">
                Aviso: Dados Simulados
              </p>
              <p className="text-sm text-yellow-700">
                Não foi possível conectar à API. Estes dados são apenas para
                visualização.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
      {/* 1. Card do Saldo */}
      <Card>
        <CardHeader>
          <CardTitle>Saldo Atual</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold inline-flex items-center gap-2">
            {" "}
            <Coins className="h-6 w-6 text-yellow-500" />{" "}
            {balance ? formatNumber(balance.balance) : "--"}{" "}
          </p>
        </CardContent>
      </Card>

      {/* 2. Tabela de Transações */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Transações</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Valor</TableHead>
                <TableHead>Destinatário</TableHead>
                <TableHead className="text-right w-[150px]">Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    Nenhuma transação encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((tx) => {
                  const isNegative = tx.amount < 0;
                  return (
                    <TableRow
                      key={tx.id}
                      className={cn(
                        isNegative
                          ? "bg-red-50 hover:bg-red-100/60"
                          : "bg-green-50 hover:bg-green-100/60"
                      )}
                    >
                      <TableCell className="font-medium">
                        <StudentCurrencyDisplay amount={tx.amount} />
                      </TableCell>
                      <TableCell>{tx.recipient}</TableCell>
                      <TableCell className="text-right">
                        {formatDate(tx.date)}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
