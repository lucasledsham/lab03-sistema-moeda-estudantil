import { z } from "zod";
export const balanceSchema = z.object({
  balance: z.number(),
});

export const transactionSchema = z.object({
  id: z.string().uuid(),
  amount: z.number(),
  recipient: z.string(),
  date: z.coerce.date(),
});

export const transactionListSchema = z.array(transactionSchema);

export type Balance = z.infer<typeof balanceSchema>;
export type Transaction = z.infer<typeof transactionSchema>;
