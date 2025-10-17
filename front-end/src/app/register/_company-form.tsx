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
    cnpj: z.string(),
    userRole: z.enum(["COMPANY",])
  })
  .refine(({ confirm, password }) => confirm === password, {
    path: ["confirm"],
    message: "As senhas devem ser iguais",
  });

export default function RegisterCompanyForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm: "",
      cnpj: "",
      userRole: "COMPANY",
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
    <Card className=" mx-auto w-sm md:w-md xl:w-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <CardHeader>
            <h1 className="text-2xl font-bold mx-auto">Cadastro de Empresa</h1>
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
            <FormField
              control={form.control}
              name="cnpj"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CNPJ</FormLabel>
                  <FormControl>
                    <Input placeholder="XX.XXX.XXX/XXXX-XX" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
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
