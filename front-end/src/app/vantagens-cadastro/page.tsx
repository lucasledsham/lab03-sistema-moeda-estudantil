"use client";

import { useState } from "react";
import BenefitForm, { BenefitsFormValues } from "./_form";

export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function handleSubmit(values: BenefitsFormValues) {
    setIsSubmitting(true);
    setError(null);
    console.log("Dados do formulário:", values);
    const formData = new FormData();
    const benefitsMetadata = values.benefits.map((benefit) => ({
      description: benefit.description,
      cost: benefit.cost,
    }));

    formData.append("benefitsData", JSON.stringify(benefitsMetadata));

    values.benefits.forEach((benefit) => {
      if (benefit.image instanceof File) {
        formData.append("images", benefit.image);
      }
    });

    //TODO: Ajustar a URL conforme necessário
    try {
      const response = await fetch("http://localhost:9090/benefits", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Falha ao enviar benefícios");
      }

      const result = await response.json();
      console.log("Sucesso:", result);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Ocorreu um erro inesperado.");
    } finally {
      setIsSubmitting(false);
    }
    setTimeout(() => {
      setIsSubmitting(false);
      console.log("Simulação de envio concluída.");
    }, 1000);
  }

  return (
    <main className="container mx-auto p-8">
      <BenefitForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />

      {error && (
        <p className="mt-4 text-red-600">
          <strong>Erro:</strong> {error}
        </p>
      )}
    </main>
  );
}
