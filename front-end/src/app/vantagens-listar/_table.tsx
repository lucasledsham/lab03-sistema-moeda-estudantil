"use client";

import Image from "next/image";
import { Search, CircleDollarSign, Loader2 } from "lucide-react";
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
  onBuyBenefit: (benefit: Benefit) => void;
  purchasingBenefitId?: string | null;
  canPurchase?: boolean;
}

const PLACEHOLDER_URL = "/Placeholder.png";
export default function BenefitTable({
  benefits,
  onViewDetails,
  onBuyBenefit,
  purchasingBenefitId,
  canPurchase = true,
}: BenefitTableProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {benefits.map((benefit) => (
        <Card key={benefit.id} className="flex flex-col">
          <CardHeader className="p-0">
            <div className="aspect-video relative w-full">
              <Image
                src={benefit.imageUrl || PLACEHOLDER_URL}
                alt={benefit.description.substring(0, 30)}
                fill
                className="rounded-t-lg object-cover"
                unoptimized={benefit.imageUrl.startsWith("data:")}
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
                variant="default"
                size="icon"
                disabled={!canPurchase || purchasingBenefitId === benefit.id}
                onClick={() => onBuyBenefit(benefit)}
                title={
                  !canPurchase
                    ? "Carregando dados para compra"
                    : "Comprar benefício"
                }
              >
                {purchasingBenefitId === benefit.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <CircleDollarSign className="h-4 w-4" />
                )}
                <span className="sr-only">Comprar</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
