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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
</head>;

const formSchema = z
  .object({
    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.email("Email inválido"),
    password: z.string(),
    confirm: z.string(),
    cpf: z.string(),
    rg: z.string(),
    adress: z.string(),
    class: z.string(),
  })
  .refine(({ confirm, password }) => confirm === password, {
    path: ["confirm"],
    message: "As senhas devem ser iguais",
  });

export default function CadastroAlunoForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm: "",
      cpf: "",
      rg: "",
      adress: "",
      class: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { confirm, ...userData } = values; // remocao do campo de confirmacao
    try {
      const res = await fetch("http://localhost:9090/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (res.ok) {
        // toast({
        //   title: "Sucesso!",
        //   description: "Cadastrado com sucesso",
        //   variant: "success",
        // });
        form.reset();
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Card className="col-span-1 mx-auto my-20 max-w-sm md:max-w-md xl:max-w-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <CardHeader>
            <h1 className="text-2xl font-bold mx-auto">Cadastrar usuário</h1>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 pb-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" type="email" {...field} />
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
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirme a senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirme a Senha"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between gap-4">
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <Input placeholder="000.000.000-00" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rg"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RG</FormLabel>
                    <FormControl>
                      <Input placeholder="00.000.000-0" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="adress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cep</FormLabel>
                    <FormControl>
                      <Input placeholder="00000-000" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="mx-auto w-72">
              Cadastrar
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
