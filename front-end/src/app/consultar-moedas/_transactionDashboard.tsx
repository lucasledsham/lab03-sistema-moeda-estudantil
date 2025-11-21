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
  const [isBalanceMock, setIsBalanceMock] = useState(false);
  const [isTransactionsMock, setIsTransactionsMock] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsBalanceMock(false);
      setIsTransactionsMock(false);

      const token = localStorage.getItem("authToken");
      const headersObj: HeadersInit = token
        ? { Authorization: `Bearer ${token}` }
        : {};

      try {
        const balanceRes = await fetch(BALANCE_API_ROUTE, {
          headers: headersObj,
        });
        if (!balanceRes.ok) throw new Error("Saldo: resposta não-OK");
        const balanceData = await balanceRes.json();
        const validatedBalance = balanceSchema.parse(balanceData);
        setBalance(validatedBalance);
      } catch (e) {
        console.warn("Falha ao buscar saldo. Usando mock.", e);
        setBalance(MOCK_BALANCE);
        setIsBalanceMock(true);
      }

      try {
        const txRes = await fetch(TRANSACTIONS_API_ROUTE, {
          headers: headersObj,
        });
        if (!txRes.ok) throw new Error("Transações: resposta não-OK");
        const txData = await txRes.json();
        const validatedTransactions = transactionListSchema.parse(txData);
        setTransactions(
          validatedTransactions.sort(
            (a, b) => b.date.getTime() - a.date.getTime()
          )
        );
      } catch (e) {
        console.warn("Falha ao buscar transações. Usando mock.", e);
        setTransactions(MOCK_TRANSACTIONS);
        setIsTransactionsMock(true);
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
