import type { ReactNode } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { PetFormValues } from "../../validators/petSchema";
import { FormField } from "../molecules/FormField";
import { Loading } from "../ui/Loading";

type PetFormProps = {
  form: UseFormReturn<PetFormValues>;
  onSubmit: (values: PetFormValues) => void;
  onPhotoChange: (file: File | null) => void;
  submitLabel: string;
  actions?: ReactNode;
};

export const PetForm = ({
  form,
  onSubmit,
  onPhotoChange,
  submitLabel,
  actions,
}: PetFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <form className="form-card" onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Nome" error={errors.nome?.message}>
        <input type="text" {...register("nome")} required />
      </FormField>

      <FormField label="Espécie / Raça" error={errors.raca?.message}>
        <input type="text" {...register("raca")} />
      </FormField>

      <FormField label="Idade" error={errors.idade?.message}>
        <input type="number" min={0} {...register("idade")} />
      </FormField>

      <FormField label="Foto do pet">
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            const file = event.target.files?.[0];
            onPhotoChange(file ?? null);
          }}
        />
      </FormField>

      <div className="form-actions">
        <button className="app-button primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Loading label="Salvando..." /> : submitLabel}
        </button>
        {actions ?? null}
      </div>
    </form>
  );
};
