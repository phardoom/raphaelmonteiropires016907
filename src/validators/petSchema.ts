import { z } from "zod";

export const petSchema = z.object({
  nome: z.string().trim().min(1, "Informe o nome do pet."),
  raca: z.string().trim().optional(),
  idade: z.preprocess(
    (value) => {
      if (value === "" || value === null || value === undefined) {
        return undefined;
      }
      const numberValue = Number(value);
      return Number.isNaN(numberValue) ? undefined : numberValue;
    },
    z.number().int().min(0, "Idade inválida.").optional()
  ),
});

export type PetFormValues = z.infer<typeof petSchema>;
