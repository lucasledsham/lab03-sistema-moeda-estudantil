"use client";

import { useState, useEffect } from "react";
import BenefitForm, { BenefitsFormValues } from "./_form";
import Navbar from "@/components/navbar";

interface User {
  id: string;
  name: string;
}

export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  useEffect(() => {
    async function fetchUser() {
      try {
        setError(null);

        //TODO: Ajustar a URL para o endpoint correto
        const response = await fetch("http://localhost:9090/auth/me");

        if (!response.ok) {
          throw new Error("Falha ao carregar dados do usuário.");
        }

        const userData: User = await response.json();
        setUser(userData);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Você não está autenticado.");
      } finally {
        setIsLoadingUser(false);
      }
    }

    fetchUser();
  }, []);

  async function handleSubmit(values: BenefitsFormValues) {
    if (!user) {
      setError(
        "Não foi possível identificar o usuário. Tente recarregar a página."
      );
      return;
    }

    setIsSubmitting(true);
    setError(null);
    console.log("Dados do formulário:", values);
    console.log("Enviando como usuário:", user.name);

    const formData = new FormData();
    formData.append("userId", user.id);
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

    //TODO: Ajustar a URL para o endpoint correto
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
  }

  const renderContent = () => {
    if (isLoadingUser) {
      return <p className="text-center">Carregando dados do usuário...</p>;
    }

    if (error && !user) {
      return (
        <p className="mt-4 text-red-600 text-center">
          <strong>Erro:</strong> {error}
        </p>
      );
    }

    if (user) {
      return (
        <>
          <BenefitForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          {error && (
            <p className="mt-4 text-red-600">
              <strong>Erro:</strong> {error}
            </p>
          )}
        </>
      );
    }

    return null;
  };

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
      <main className="container mx-auto p-8">{renderContent()}</main>
    </>
  );
}
