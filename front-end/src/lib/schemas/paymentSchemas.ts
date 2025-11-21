import { z } from "zod";

export const userRoleSchema = z.enum(["STUDENT", "COMPANY", "TEACHER", "ADMIN"]);
export type UserRole = z.infer<typeof userRoleSchema>;

export const userSchema = z.object({
  id: z.string().min(1, 'Id inválido'),
  name: z.string(),
  email: z.string().email(),
  role: userRoleSchema,
});

export const userListSchema = z.array(userSchema);

export const paymentPayloadSchema = z.object({
  recipientId: z.string().min(1, { message: "Selecione um aluno." }),
  amount: z.coerce
    .number()
    .min(0.01, { message: "Valor deve ser maior que 0." })
    .refine((v) => Number.isFinite(v), { message: "Valor inválido." }),
  message: z.string().min(1, { message: "A mensagem é obrigatória." }),
});
export const currentUserSchema = userSchema.extend({
  balance: z.number(),
});
export type CurrentUser = z.infer<typeof currentUserSchema>;

export type User = z.infer<typeof userSchema>;
export type PaymentPayload = z.infer<typeof paymentPayloadSchema>;
