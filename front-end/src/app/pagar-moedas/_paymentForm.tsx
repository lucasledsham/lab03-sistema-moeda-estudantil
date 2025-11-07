"use client";

import React, { useEffect, useState } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  AlertTriangle,
  Check,
  ChevronsUpDown,
  Coins,
  Loader2,
} from "lucide-react";

import emailjs from "@emailjs/browser";

import EMAILJS_CONFIG from "@/lib/config/configEmailJS";

import {
  userListSchema,
  paymentPayloadSchema,
  currentUserSchema,
  type User,
  type CurrentUser,
} from "@/lib/schemas/paymentSchemas";
import { MOCK_USERS, MOCK_CURRENT_USER } from "@/lib/mocks/financeMocks";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const API_BASE_URL = "http://localhost:9090";
const CURRENT_USER_API_ROUTE = `${API_BASE_URL}/currentUser`;
const USERS_API_ROUTE = `${API_BASE_URL}/users`;
const PAYMENT_API_ROUTE = `${API_BASE_URL}/payment`;

function formatNumber(amount: number) {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function PaymentForm() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [students, setStudents] = useState<User[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMockData, setIsMockData] = useState(false);

  type FormValues = z.infer<typeof paymentPayloadSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(paymentPayloadSchema),
    defaultValues: { recipientId: "", amount: 0, message: "" },
  });

  const fetchData = async () => {
    setIsLoadingData(true);
    setIsMockData(false);
    try {
      const [currentUserRes, usersRes] = await Promise.all([
        fetch(CURRENT_USER_API_ROUTE),
        fetch(USERS_API_ROUTE),
      ]);

      if (!currentUserRes.ok || !usersRes.ok) {
        throw new Error("Falha ao buscar dados da API.");
      }

      const currentUserData = await currentUserRes.json();
      const usersData = await usersRes.json();

      const validatedCurrentUser = currentUserSchema.parse(currentUserData);
      const validatedUsers = userListSchema.parse(usersData);

      setCurrentUser(validatedCurrentUser);
      setStudents(validatedUsers.filter((user) => user.role === "STUDENT"));
    } catch (err) {
      console.warn("API falhou. Carregando dados mockados.", err);
      toast.warning("API não encontrada", {
        description: "Carregando dados de simulação.",
      });
      setIsMockData(true);
      setCurrentUser(MOCK_CURRENT_USER);
      setStudents(MOCK_USERS.filter((user) => user.role === "STUDENT"));
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sendPaymentEmails = async (paymentData: FormValues, receiver: User) => {
    if (!currentUser) return;

    const time = new Date().toLocaleString("pt-BR");
    const commonParams = {
      sender_name: currentUser.name,
      receiver_name: receiver.name,
      amount: formatNumber(paymentData.amount),
      message: paymentData.message,
      time: time,
    };

    const senderParams = {
      ...commonParams,
      to_email: currentUser.email,
    };

    const receiverParams = {
      ...commonParams,
      to_email: receiver.email,
    };
    const emailPromises = [
      emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID_SENDER,
        senderParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      ),
      emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID_RECEIVER,
        receiverParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      ),
    ];

    const results = await Promise.allSettled(emailPromises);

    results.forEach((result, index) => {
      const emailType = index === 0 ? "Remetente" : "Destinatário";
      if (result.status === "fulfilled") {
        console.log(`Email para ${emailType} enviado com sucesso.`);
      } else {
        console.error(
          `Falha ao enviar e-mail para ${emailType}:`,
          result.reason
        );
      }
    });
  };

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);

    if (!currentUser || values.amount > currentUser.balance) {
      toast.error("Saldo insuficiente", {
        description: "O valor a transferir é maior que o seu saldo atual.",
      });
      setIsSubmitting(false);
      form.setFocus("amount");
      return;
    }

    try {
      const response = await fetch(PAYMENT_API_ROUTE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Falha ao enviar o pagamento.");
      }

      toast.success("Pagamento enviado!", {
        description: "Suas moedas foram transferidas com sucesso.",
      });

      const receiver = students.find((s) => s.id === values.recipientId);
      if (receiver) {
        sendPaymentEmails(values, receiver);
      }

      form.reset();
      fetchData();
    } catch (error) {
      toast.error("Erro no Pagamento", {
        description:
          (error as Error).message || "Não foi possível completar a transação.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function onInvalid(errors: FieldErrors<FormValues>) {
    console.error("Erros de validação:", errors);
    toast.error("Campos inválidos", {
      description: "Por favor, corrija os campos em vermelho.",
    });
  }

  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Coluna da Esquerda: Saldo */}
      <div className="md:col-span-1 space-y-4">
        {isMockData && (
          <Card className="bg-yellow-50 border-yellow-300">
            <CardContent className="p-4 flex items-center space-x-3">
              <AlertTriangle className="text-yellow-600 h-5 w-5" />
              <div>
                <p className="font-semibold text-yellow-800">
                  Aviso: Dados Simulados
                </p>
              </div>
            </CardContent>
          </Card>
        )}
        {/* Card de Saldo*/}
        <Card>
          <CardHeader>
            <CardTitle>Meu Saldo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold inline-flex items-center gap-2">
              <Coins className="h-8 w-8 text-yellow-500" />
              {currentUser ? formatNumber(currentUser.balance) : "--"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Coluna da Direita: Formulário de Pagamento */}
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Nova Transferência</CardTitle>
            <CardDescription>Envie moedas para outro aluno.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit, onInvalid)}
                className="space-y-6"
              >
                {/* Campo 1: Combobox de Aluno */}
                <FormField
                  control={form.control}
                  name="recipientId"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Destinatário</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? students.find(
                                    (student) => student.id === field.value
                                  )?.name
                                : "Selecione um aluno"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popvert-trigger-width] p-0">
                          <Command>
                            <CommandInput placeholder="Procurar aluno..." />
                            <CommandList>
                              <CommandEmpty>
                                Nenhum aluno encontrado.
                              </CommandEmpty>
                              <CommandGroup>
                                {students.map((student) => (
                                  <CommandItem
                                    value={student.name}
                                    key={student.id}
                                    onSelect={() => {
                                      form.setValue("recipientId", student.id);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        student.id === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {student.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Campo 2: Quantidade */}
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantidade</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0,00"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Seu saldo atual é:{" "}
                        {currentUser ? formatNumber(currentUser.balance) : 0}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Campo 3: Mensagem */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensagem (Obrigatória)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Ex: Obrigado pela ajuda no projeto!"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Botão de Envio */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Transferir Moedas
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
