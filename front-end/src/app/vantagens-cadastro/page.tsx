"use client";

import { useState, useEffect } from "react";
import BenefitForm, { BenefitsFormValues } from "./_form";
import Navbar from "@/components/navbar";
import { toast } from "sonner";

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

        const token = localStorage.getItem("authToken");
        const headersObj: HeadersInit = token
          ? { Authorization: `Bearer ${token}` }
          : {};
        const response = await fetch("http://localhost:9090/user", {
          headers: headersObj,
        });

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
      const errorMessage =
        "Não foi possível identificar o usuário. Tente recarregar a página.";
      setError(errorMessage);
      toast.error("Acesso Negado", { description: errorMessage });
      return;
    }

    const submitToastId = toast.loading(
      "Enviando benefícios para o servidor..."
    );

    setIsSubmitting(true);
    setError(null);
    console.log("Dados do formulário:", values);
    console.log("Enviando como usuário:", user.name);

    const formData = new FormData();
    const benefit = {
      description: values.benefits[0].description,
      cost: values.benefits[0].cost,
    };
    formData.append("benefit", JSON.stringify(benefit));
    if (values.benefits[0].image instanceof File) {
      formData.append("image", values.benefits[0].image);
    }

    try {
      const token = localStorage.getItem("authToken");
      const headersObj: HeadersInit = token
        ? { Authorization: `Bearer ${token}` }
        : {};
      const fetchOptions: RequestInit = {
        method: "POST",
        body: formData,
      };
      if (token) {
        fetchOptions.headers = headersObj;
      }
      const response = await fetch(
        "http://localhost:9090/benefits",
        fetchOptions
      );

      if (!response.ok) {
        const errorData = await response.json();
        // ⬅️ Toast de FALHA: API retornou erro (e.g., 400, 500)
        throw new Error(errorData.message || "Falha ao enviar benefícios");
      }

      const result = await response.json();
      console.log("Sucesso:", result);

      // ⬅️ Toast de SUCESSO: Requisição 2xx
      toast.dismiss(submitToastId); // Remove o toast de loading
      toast.success("Sucesso", {
        description: "Benefício cadastrado com sucesso!",
        duration: 5000,
      });
    } catch (err: any) {
      console.error(err);
      const errorMessage = err.message || "Ocorreu um erro inesperado.";
      setError(errorMessage);

      toast.dismiss(submitToastId); // Remove o toast de loading
      // ⬅️ Toast de FALHA: Erro de rede ou erro lançado acima
      toast.error("Falha no Cadastro", {
        description: errorMessage,
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const renderContent = () => {
    // ... (restante da renderização - sem alteração)
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

          { href: "/login", title: "Sair" },
        ]}
        className=""
      ></Navbar>
      <main className="container mx-auto p-8">{renderContent()}</main>
    </>
  );
}
