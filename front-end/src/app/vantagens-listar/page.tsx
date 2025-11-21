"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import BenefitTable from "./_table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Navbar from "@/components/navbar";

const API_URL = "http://localhost:9090/benefits";
const PLACEHOLDER_URL = "/placeholder.png";

type BenefitResponse = {
  id?: string;
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

  useEffect(() => {
    async function fetchBenefits() {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("authToken");
        const headersObj: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await fetch(API_URL, {
          headers: headersObj,
        });

        if (!response.ok) {
          throw new Error(`Falha ao buscar dados (status: ${response.status})`);
        }

        const data: BenefitResponse[] = await response.json();
        const normalized = data.map((benefit, index) => {
          const hasImage = Boolean(benefit.imageBase64 && benefit.imageBase64.length > 0);
          const mimeType = benefit.contentType || "image/jpeg";
          const imageUrl = hasImage
            ? `data:${mimeType};base64,${benefit.imageBase64}`
            : PLACEHOLDER_URL;

          return {
            id: benefit.id ?? `benefit-${index}`,
            description: benefit.description,
            cost: typeof benefit.cost === "string" ? Number(benefit.cost) : benefit.cost,
            imageUrl,
          } satisfies BenefitCard;
        });

        setBenefits(normalized);
      } catch (err: any) {
        console.error(err);
        setError(
          err.message || "Não foi possível carregar as vantagens do servidor."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchBenefits();
  }, []);

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
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </>
  );
}
