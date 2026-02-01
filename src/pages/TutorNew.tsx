import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TutorForm } from "../components/forms/TutorForm";
import { ErrorState } from "../components/ui/ErrorState";
import { tutorsService } from "../services/tutorsService";
import { getErrorMessage } from "../utils/errorHandler";
import { tutorSchema, type TutorFormValues } from "../validators/tutorSchema";

export const TutorNew = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const form = useForm<TutorFormValues>({
    resolver: zodResolver(tutorSchema),
  });

  const onSubmit = async (values: TutorFormValues) => {
    setError(null);
    try {
      const created = await tutorsService.create(values);
      if (photoFile) {
        await tutorsService.uploadPhoto(created.id, photoFile);
      }
      navigate("/tutores", { replace: true });
    } catch (err) {
      setError(getErrorMessage(err, "Não foi possível cadastrar o tutor."));
    }
  };

  return (
    <section className="flex flex-col gap-6">
      <header>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Novo tutor</h2>
        <p className="text-sm text-slate-500">Cadastre um novo tutor.</p>
      </header>

      {error ? <ErrorState message={error} /> : null}

      <TutorForm
        form={form}
        onSubmit={onSubmit}
        onPhotoChange={setPhotoFile}
        submitLabel="Salvar"
      />
    </section>
  );
};
