"use client";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Removido uso incorreto de <head>; use metadata ou next/head se necessário.

const formSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "Senha obrigatória"),
});

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function safeErrorText(res: Response) {
    try {
      return await res.text();
    } catch (e) {
      return "Erro desconhecido";
    }
  }
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch("http://localhost:9090/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      console.log("[LOGIN] status:", res.status);
      if (res.ok) {
        let data: any = {};
        try {
          data = await res.json();
        } catch (e) {
          console.warn("Resposta sem JSON válido.");
        }
        if (data.token) {
          localStorage.setItem("authToken", data.token);
        }
        if (data.userId) {
          localStorage.setItem("userId", data.userId);
        }
        // Feedback de sucesso
        toast.success("Login realizado", {
          description: "Redirecionando...",
          duration: 2500,
        });
        // Função de navegação robusta
        const navigateToHome = () => {
          try {
            router.push("/home");
            console.log("[LOGIN] router.push('/home') chamado");
            // Fallback caso o push não reflita visualmente rápido
            setTimeout(() => {
              console.log("[LOGIN] Fallback router.replace('/home')");
              router.replace("/home");
            }, 1500);
          } catch (navErr) {
            console.error("[LOGIN] Erro ao navegar", navErr);
          }
        };
        // Usa microtask para garantir que state/localStorage finalize
        Promise.resolve().then(navigateToHome);
      } else {
        toast.error("Erro ao fazer login", {
          description: "Dados da conta incorretos",
          duration: 5000,
        });
        console.error("[LOGIN] Falha", await safeErrorText(res));
      }
    } catch (error) {
      console.error(error);

      toast.error("Erro de Conexão", {
        description: "Não foi possível conectar ao servidor.",
      });
    }
  }
  return (
    <Card className="col-span-1 mx-auto  max-w-sm md:max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <CardHeader>
            <h2 className="text-center text-2xl font-bold">Entrar</h2>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 pb-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="E-mail" type="email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input placeholder="Senha" type="password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex flex-col justify-center pt-4 pb-4">
            <Button type="submit" className="mx-full w-72 mb-12">
              Login
            </Button>
            <span className="mx-auto mb-4">Não possui conta?</span>

            <Button
              type="button"
              className="mx-full w-72 "
              onClick={() => router.push("/register")}
            >
              Cadastrar-se
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
