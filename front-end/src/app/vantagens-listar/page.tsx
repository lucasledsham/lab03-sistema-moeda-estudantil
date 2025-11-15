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

const PLACEHOLDER_URL = "/Placeholder.png";
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
    description: "Outro benefício! Este é o segundo item da lista de mock.",
    cost: 50,
    imageUrl: PLACEHOLDER_URL,
  },
  {
    id: "mock-3",
    description: "Apenas mais um para preencher a grade.",
    cost: 75,
    imageUrl: PLACEHOLDER_URL,
  },
];

//TODO: Ajustar a URL da API
const API_URL = "http://localhost:9090/benefits";

export default function VantagensListarPage() {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);

  useEffect(() => {
    async function fetchBenefits() {
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
        console.error(err);

        setError(
          "Não foi possível conectar ao servidor. Carregando dados de exemplo."
        );
        setBenefits(MOCK_BENEFITS);
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

        {error && <p className="text-center text-red-600 mb-4"></p>}

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
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </>
  );
}
