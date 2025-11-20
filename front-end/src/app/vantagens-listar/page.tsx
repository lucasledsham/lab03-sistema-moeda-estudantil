"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import BenefitTable from "./_table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Navbar from "@/components/navbar";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";

const PLACEHOLDER_URL = "/Placeholder.png";
const EMAILJS_SERVICE_ID = "service_76h397n";
const EMAILJS_TEMPLATE_ID = "template_sa25p9x";
const EMAILJS_PUBLIC_KEY = "VFJ-_O0skjpmzB20e";

interface Benefit {
  id: string;
  description: string;
  cost: number;
  imageUrl: string;
}

const MOCK_BENEFITS: Benefit[] = [
  {
    id: "mock-1",
    description:
      "Este é um benefício de exemplo. A descrição pode ser bem longa para testar o modal.",
    cost: 100,
    imageUrl: PLACEHOLDER_URL,
  },
  {
    id: "mock-2",
    description: "Beneficio de exemplo número dois.",
    cost: 50,
    imageUrl: PLACEHOLDER_URL,
  },
  {
    id: "mock-3",
    description: "Beneficio de exemplo número três.",
    cost: 75,
    imageUrl: PLACEHOLDER_URL,
  },
];

//TODO-- Arrumar a url da api
const API_URL = "http://localhost:9090/benefits";
const BALANCE_API_URL = "http://localhost:9090/moeda/balance";
const PURCHASE_API_BASE_URL = "http://localhost:9090/"; // /purchase/{id} ou algo do tipo
const USER_EMAIL_API_BASE_URL = "http://localhost:9090/"; // /user/email ou algo do tipo
const COUPON_CODE_API_BASE_URL = "http://localhost:9090/"; // /coupon/generate/{id} ou algo do tipo

export default function VantagensListarPage() {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
  const [userBalance, setUserBalance] = useState(0);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const fetchBenefits = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_URL, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Falha ao buscar dados (status: ${response.status})`);
      }

      const data: Benefit[] = await response.json();
      setBenefits(data);
    } catch (err: any) {
      console.error("Erro ao buscar benefícios:", err);

      setError(
        "Não foi possível conectar ao servidor de benefícios. Carregando dados de exemplo."
      );
      setBenefits(MOCK_BENEFITS);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchBalance = useCallback(async () => {
    try {
      const response = await fetch(BALANCE_API_URL, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Falha ao buscar saldo (status: ${response.status})`);
      }

      const data = await response.json();
      const balance = data.balance !== undefined ? data.balance : data;
      setUserBalance(Number(balance));
    } catch (err: any) {
      console.error("Erro ao buscar saldo:", err);
      setUserBalance(0);
    }
  }, []);

  const fetchUserEmail = useCallback(async () => {
    const emailUrl = `${USER_EMAIL_API_BASE_URL}user/email`;

    try {
      const response = await fetch(emailUrl, { credentials: "include" });
      if (!response.ok) throw new Error("Falha ao buscar e-mail do usuário.");

      const data = await response.json();
      const email = data.email || data.userEmail || data;
      setUserEmail(String(email));
    } catch (err) {
      console.error("Erro ao buscar e-mail do usuário:", err);
      setUserEmail(null);
    }
  }, []);

  const fetchCouponCode = async (benefitId: string): Promise<string> => {
    const couponUrl = `${COUPON_CODE_API_BASE_URL}coupon/generate/${benefitId}`;

    try {
      const response = await fetch(couponUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ benefitId: benefitId }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(
          `Falha ao obter código do cupom (status: ${response.status})`
        );
      }

      const data = await response.json();
      return data.code || data.couponCode || "CUPOM-PADRAO-000";
    } catch (err) {
      console.error("Erro ao buscar código do cupom:", err);
      return "CUPOM-ERRO-123";
    }
  };

  const buyBenefit = async (benefit: Benefit) => {
    if (userBalance < benefit.cost) {
      toast.error("Saldo Insuficiente", {
        description: `Você precisa de ${benefit.cost} moedas, mas possui apenas ${userBalance}.`,
      });
      return;
    }

    if (!userEmail) {
      toast.warning("E-mail do Usuário Ausente", {
        description:
          "Não foi possível identificar seu e-mail para enviar o cupom.",
      });
      return;
    }

    const purchaseUrl = `${PURCHASE_API_BASE_URL}purchase/${benefit.id}`;
    const purchaseToastId = toast.loading(
      `Tentando comprar ${benefit.description.substring(0, 20)}...`
    );

    try {
      const response = await fetch(purchaseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ benefitId: benefit.id, cost: benefit.cost }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Falha na transação (status: ${response.status})`
        );
      }
      const couponCode = await fetchCouponCode(benefit.id);
      const messageContent = `Aqui está o código do seu cupom ${couponCode}, obrigado por usar o Educoin!`;

      const templateParams = {
        to_email: userEmail,
        subject: `Educoin - Cupom para ${benefit.description.substring(0, 30)}`,
        message: messageContent,
        name: userEmail,
        title: "Confirmação de Resgate",
      };

      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
          EMAILJS_PUBLIC_KEY
        );
        toast.dismiss(purchaseToastId);
        toast.success("Compra e E-mail Enviados!", {
          description: `Você adquiriu o benefício. O cupom foi enviado para ${userEmail}.`,
        });
      } catch (emailError) {
        console.error("Falha ao enviar e-mail:", emailError);
        toast.dismiss(purchaseToastId);
        toast.warning("Compra Sucesso, E-mail Falhou", {
          description: `A compra foi concluída, mas houve um erro ao enviar o cupom por e-mail. Código: ${couponCode}`,
        });
      }

      await fetchBalance();
    } catch (err: any) {
      console.error("Erro na compra:", err);
      toast.dismiss(purchaseToastId);
      toast.error("Erro na Transação", {
        description:
          err.message || "Ocorreu um erro ao tentar creditar o benefício.",
      });
    }
  };

  useEffect(() => {
    fetchBenefits();
    fetchBalance();
    fetchUserEmail();
  }, [fetchBenefits, fetchBalance, fetchUserEmail]);

  return (
    <>
      <Navbar
        links={[
          { href: "/home", title: "Home" },
          { href: "/consultar-moedas", title: "Meu Saldo" },
          { href: "/pagar-moedas", title: "Pagar Moedas" },
          { href: "/vantagens-cadastro", title: "Cadastrar Vantagens" },
          { href: "/vantagens-listar", title: "Ver Vantagens" },

          { href: "/logout", title: "Sair" },
        ]}
        className=""
      ></Navbar>
      <main className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Vantagens Disponíveis
        </h1>

        {loading && <p className="text-center">Carregando vantagens...</p>}

        {error && <p className="text-center text-red-600 mb-4">{error}</p>}

        {!loading && benefits.length === 0 && (
          <p className="text-center text-gray-500">
            Nenhuma vantagem encontrada.
          </p>
        )}

        {!loading && benefits.length > 0 && (
          <BenefitTable
            benefits={benefits}
            onViewDetails={setSelectedBenefit}
            onBuyBenefit={buyBenefit}
          />
        )}

        <Dialog
          open={!!selectedBenefit}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              setSelectedBenefit(null);
            }
          }}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Detalhes da Vantagem</DialogTitle>
            </DialogHeader>

            {selectedBenefit && (
              <div className="space-y-4">
                <div className="aspect-video relative w-full">
                  <Image
                    src={selectedBenefit.imageUrl || PLACEHOLDER_URL}
                    alt="Imagem da vantagem"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    onError={(e) => (e.currentTarget.src = PLACEHOLDER_URL)}
                  />
                </div>
                <span className="text-xl font-bold text-primary">
                  Custo: {selectedBenefit.cost} Moedas
                </span>
                <p className="text-sm text-muted-foreground">
                  {selectedBenefit.description}
                </p>
                <Button
                  className="w-full"
                  onClick={() => {
                    buyBenefit(selectedBenefit);
                    setSelectedBenefit(null);
                  }}
                  disabled={userBalance < selectedBenefit.cost || !userEmail}
                  title={
                    userBalance < selectedBenefit.cost
                      ? "Saldo insuficiente"
                      : !userEmail
                      ? "Carregando dados do usuário..."
                      : "Comprar"
                  }
                >
                  Comprar por {selectedBenefit.cost} Moedas
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </>
  );
}
