import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PetForm } from "../components/forms/PetForm";
import { ErrorState } from "../components/ui/ErrorState";
import { useToast } from "../contexts/ToastContext";
import { petsService } from "../services/petsService";
import { getErrorMessage } from "../utils/errorHandler";
import { petSchema, type PetFormValues } from "../validators/petSchema";

export const PetNew = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const form = useForm<PetFormValues>({
    resolver: zodResolver(petSchema),
  });

  const onSubmit = async (values: PetFormValues) => {
    setError(null);
    try {
      const created = await petsService.create({
        nome: values.nome.trim(),
        raca: values.raca?.trim() || undefined,
        idade: values.idade,
      });
      if (photoFile) {
        await petsService.uploadPhoto(created.id, photoFile);
      }
      addToast("Pet cadastrado com sucesso!", "success");
      navigate("/pets", { replace: true });
    } catch (err) {
      setError(getErrorMessage(err, "Não foi possível cadastrar o pet."));
    }
  };

  return (
    <section className="flex flex-col gap-6">
      <header>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Novo pet</h2>
        <p className="text-sm text-slate-500">Cadastre um novo pet no sistema.</p>
      </header>

      {error ? <ErrorState message={error} /> : null}

      <PetForm form={form} onSubmit={onSubmit} onPhotoChange={setPhotoFile} submitLabel="Salvar" />
    </section>
  );
};
