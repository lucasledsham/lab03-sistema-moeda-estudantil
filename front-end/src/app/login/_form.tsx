"use client";

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
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginRequest } from "@/services/authService";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    try {
      const data = await loginRequest(values);

      if (data.token) localStorage.setItem("authToken", data.token);
      if (data.userId) localStorage.setItem("userId", data.userId);

      toast.success("Login realizado", {
        description: "Redirecionando...",
      });

      router.push("/home");
    } catch (err: any) {
      toast.error("Erro ao fazer login", {
        description: err.message || "Credenciais inválidas",
      });
      console.error(err);
    }
  }

  return (
    <Card className="col-span-1 mx-auto max-w-sm md:max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <h2 className="text-center text-2xl font-bold">Entrar</h2>
          </CardHeader>

          <CardContent className="flex flex-col gap-2 pb-6">
            <FormField
              control={form.control}
              name="email"
              render={() => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="E-mail"
                      {...form.register("email", {
                        required: "E-mail obrigatório",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "E-mail inválido",
                        },
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={() => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Senha"
                      {...form.register("password", { required: "Senha obrigatória" })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex flex-col justify-center pt-4 pb-4">
            <Button type="submit" className="w-72 mb-12">
              Login
            </Button>

            <span className="mx-auto mb-4">Não possui conta?</span>

            <Button onClick={() => router.push("/register")} className="w-72">
              Cadastrar-se
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
