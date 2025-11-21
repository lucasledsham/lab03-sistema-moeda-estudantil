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
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import EMAILJS_CONFIG from "@/lib/config/configEmailJS";

const API_BASE_URL = "http://localhost:9090";
const BENEFITS_API_URL = `${API_BASE_URL}/benefits`;
const BALANCE_API_URL = `${API_BASE_URL}/moeda/balance`;
const PURCHASE_API_URL = `${API_BASE_URL}/benefits/purchase`;
const USER_EMAIL_API_URL = `${API_BASE_URL}/user`;
const PLACEHOLDER_URL = "/Placeholder.png";

const getAuthHeaders = (): Record<string, string> => {
  if (typeof window === "undefined") {
    return {};
  }
  const token = localStorage.getItem("authToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

type BenefitResponse = {
  id: string | null;
  description: string;
  cost: number | string;
  imageBase64: string | null;
  contentType: string | null;
};

type BenefitCard = {
  id: string;
  description: string;
  cost: number;
  imageUrl: string;
};

export default function VantagensListarPage() {
  const [benefits, setBenefits] = useState<BenefitCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBenefit, setSelectedBenefit] = useState<BenefitCard | null>(null);
  const [userBalance, setUserBalance] = useState(0);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [processingBenefitId, setProcessingBenefitId] = useState<string | null>(null);

  const fetchBenefits = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(BENEFITS_API_URL, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Falha ao buscar dados (status: ${response.status})`);
      }

      const data: BenefitResponse[] = await response.json();
      const normalized = data
        .map((benefit) => {
          if (!benefit.id) {
            console.warn("Benefício sem ID válido recebido:", benefit);
            return null;
          }

        const hasImage = Boolean(benefit.imageBase64 && benefit.imageBase64.length > 0);
        const mimeType = benefit.contentType || "image/jpeg";
        const imageUrl = hasImage
          ? `data:${mimeType};base64,${benefit.imageBase64}`
          : PLACEHOLDER_URL;

        return {
          id: benefit.id,
          description: benefit.description,
          cost: typeof benefit.cost === "string" ? Number(benefit.cost) : benefit.cost,
          imageUrl,
        } satisfies BenefitCard;
        })
        .filter((benefit): benefit is BenefitCard => benefit !== null);

      setBenefits(normalized);
    } catch (err) {
      console.error(err);
      const message =
        err instanceof Error
          ? err.message
          : "Não foi possível carregar as vantagens do servidor.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchBalance = useCallback(async () => {
    try {
      const response = await fetch(BALANCE_API_URL, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Falha ao buscar saldo (status: ${response.status})`);
      }

      const data = await response.json();
      const parsedBalance =
        typeof data === "number"
          ? data
          : Number(data.balance ?? data.saldo ?? data.value ?? 0);

      setUserBalance(Number.isFinite(parsedBalance) ? parsedBalance : 0);
    } catch (err) {
      console.error("Erro ao buscar saldo:", err);
      setUserBalance(0);
    }
  }, []);

  const fetchUserEmail = useCallback(async () => {
    try {
      const response = await fetch(USER_EMAIL_API_URL, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error("Falha ao buscar e-mail do usuário.");
      }

      const data = await response.json();
      const email = data.email ?? data.userEmail ?? data;
      setUserEmail(typeof email === "string" ? email : null);
    } catch (err) {
      console.error("Erro ao buscar e-mail do usuário:", err);
      setUserEmail(null);
    }
  }, []);

  const buyBenefit = useCallback(
    async (benefit: BenefitCard) => {
      if (userBalance < benefit.cost) {
        toast.error("Saldo insuficiente", {
          description: `Você precisa de ${benefit.cost} moedas, mas possui apenas ${userBalance}.`,
        });
        return;
      }

      if (!userEmail) {
        toast.warning("E-mail do usuário ausente", {
          description: "Não foi possível identificar seu e-mail para enviar o cupom.",
        });
        return;
      }

      const purchaseToastId = toast.loading(
        `Tentando comprar ${benefit.description.substring(0, 30)}...`
      );
      setProcessingBenefitId(benefit.id);

      try {
        const response = await fetch(
          `${PURCHASE_API_URL}/${benefit.id}?cost=${benefit.cost}`,
          {
          method: "POST",
            headers: {
              ...getAuthHeaders(),
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || `Falha na transação (status: ${response.status})`
          );
        }

        const purchaseData = await response.json().catch(() => ({}));
        const couponCode = purchaseData.coupon ?? "CUPOM-PADRAO-000";

        if (
          EMAILJS_CONFIG.SERVICE_ID &&
          EMAILJS_CONFIG.TEMPLATE_ID_RECEIVER &&
          EMAILJS_CONFIG.PUBLIC_KEY
        ) {
          await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID_RECEIVER,
            {
              to_email: userEmail,
              benefit_name: benefit.description,
              coupon_code: couponCode,
              title: "Confirmação de Resgate",
              message: `Aqui está o código do seu cupom: ${couponCode}`,
            },
            EMAILJS_CONFIG.PUBLIC_KEY
          );
        } else {
          console.warn("Configuração do EmailJS ausente. Pulando envio de e-mail.");
        }

        toast.success("Compra concluída!", {
          description: `O código foi enviado para ${userEmail}.`,
        });

        await fetchBalance();
      } catch (err) {
        console.error("Erro na compra:", err);
        const message =
          err instanceof Error
            ? err.message
            : "Ocorreu um erro ao tentar creditar o benefício.";
        toast.error("Erro na transação", {
          description: message,
        });
      } finally {
        toast.dismiss(purchaseToastId);
        setProcessingBenefitId(null);
      }
    },
    [userBalance, userEmail, fetchBalance]
  );

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

        {error && (
          <p className="text-center text-red-600 mb-4">
            <strong>Erro:</strong> {error}
          </p>
        )}

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
            purchasingBenefitId={processingBenefitId}
            canPurchase={Boolean(userEmail)}
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
                    src={selectedBenefit.imageUrl}
                    alt="Imagem da vantagem"
                    fill
                    className="rounded-lg object-cover"
                    unoptimized={selectedBenefit.imageUrl.startsWith("data:")}
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
                  onClick={async () => {
                    await buyBenefit(selectedBenefit);
                    setSelectedBenefit(null);
                  }}
                  disabled={
                    !userEmail ||
                    userBalance < selectedBenefit.cost ||
                    processingBenefitId === selectedBenefit.id
                  }
                  title={
                    !userEmail
                      ? "Carregando dados do usuário"
                      : userBalance < selectedBenefit.cost
                      ? "Saldo insuficiente"
                      : "Comprar benefício"
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
