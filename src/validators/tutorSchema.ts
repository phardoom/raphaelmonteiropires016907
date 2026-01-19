import { z } from "zod";

export const tutorSchema = z.object({
  nome: z.string().trim().min(1, "Informe o nome completo."),
  telefone: z.string().trim().min(10, "Informe um telefone válido."),
  endereco: z.string().trim().min(1, "Informe o endereço."),
});

export type TutorFormValues = z.infer<typeof tutorSchema>;
