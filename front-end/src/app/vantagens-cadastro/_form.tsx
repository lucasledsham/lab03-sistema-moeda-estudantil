"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { benefit } from "@/lib/schemas/benefitsSchemas";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const createBenefitSchema = benefit.omit({ id: true }).extend({
  cost: z.coerce.number().min(1, "O custo deve ser pelo menos 1"),
});
export const benefitsFormSchema = z.object({
  benefits: z
    .array(createBenefitSchema)
    .min(1, "Você deve adicionar pelo menos um benefício."),
});

export type BenefitsFormValues = z.infer<typeof benefitsFormSchema>;

interface BenefitFormProps {
  onSubmit: (values: BenefitsFormValues) => Promise<void>;
  isSubmitting: boolean;
}

export default function BenefitForm({
  onSubmit,
  isSubmitting,
}: BenefitFormProps) {
  const form = useForm({
    resolver: zodResolver(benefitsFormSchema),
    defaultValues: {
      benefits: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "benefits",
  });

  function handleFormSubmit(values: BenefitsFormValues) {
    onSubmit(values);
  }

  function addNewBenefit() {
    append({
      description: "",
      cost: undefined,
      image: undefined,
    });
  }

  return (
    <Card className="mx-auto  max-w-md md:max-w-xl">
      <CardHeader>
        <h2 className="text-center text-2xl font-bold">
          Cadastro de Benefícios
        </h2>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-8"
          >
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="border p-4 rounded-lg space-y-4 relative"
                >
                  <h3 className="font-semibold">Benefício #{index + 1}</h3>
                  <FormField
                    control={form.control}
                    name={`benefits.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Descreva o benefício..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`benefits.${index}.cost`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Custo (em moedas)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="100"
                            onBlur={field.onBlur}
                            name={field.name}
                            ref={field.ref}
                            value={String(field.value ?? "")}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`benefits.${index}.image`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Imagem</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept=".jpg, .jpeg, .png, .webp"
                            onChange={(e) =>
                              field.onChange(
                                e.target.files ? e.target.files[0] : undefined
                              )
                            }
                            onBlur={field.onBlur}
                            name={field.name}
                            ref={field.ref}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remover benefício</span>
                  </Button>
                </div>
              ))}
            </div>
            {form.formState.errors.benefits?.message && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.benefits.message}
              </p>
            )}
            <CardFooter className="flex items-center justify-center md:gap-16 sm:gap-8">
              <Button
                type="button"
                variant="outline"
                onClick={addNewBenefit}
                className="mr-4"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Benefício
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar Benefícios"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
