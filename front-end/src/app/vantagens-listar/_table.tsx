"use client";

import Image from "next/image";
import { Search, CircleDollarSign } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Benefit {
  id: string;
  description: string;
  cost: number;
  imageUrl: string;
}

interface BenefitTableProps {
  benefits: Benefit[];
  onViewDetails: (benefit: Benefit) => void;
  // Nova propriedade para a função de compra
  onBuyBenefit: (benefit: Benefit) => Promise<void>;
}

const PLACEHOLDER_URL = "/Placeholder.png";
export default function BenefitTable({
  benefits,
  onViewDetails,
  onBuyBenefit, // Recebemos a nova função
}: BenefitTableProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {benefits.map((benefit) => (
        <Card key={benefit.id} className="flex flex-col">
          {/* ... CardHeader e CardContent (sem alteração) */}
          <CardHeader className="p-0">
            <div className="aspect-video relative w-full">
              <Image
                src={benefit.imageUrl || PLACEHOLDER_URL}
                alt={benefit.description.substring(0, 30)}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
                onError={(e) => (e.currentTarget.src = PLACEHOLDER_URL)}
              />
            </div>
          </CardHeader>

          <CardContent className="pt-4 flex-grow">
            <p className="truncate" title={benefit.description}>
              {benefit.description}
            </p>
          </CardContent>

          <CardFooter className="flex justify-between items-center">
            <span className="text-lg font-bold text-primary">
              {benefit.cost} Moedas
            </span>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => onViewDetails(benefit)}
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Ver detalhes</span>
              </Button>

              <Button
                variant="default" // Alterado para 'default' para dar destaque ao botão de compra
                size="icon"
                // Removemos 'disabled' e 'cursor-not-allowed'
                // Chamamos a função onBuyBenefit
                onClick={() => onBuyBenefit(benefit)}
              >
                <CircleDollarSign className="h-4 w-4" />
                <span className="sr-only">Comprar</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
