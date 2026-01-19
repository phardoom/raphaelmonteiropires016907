import type { ReactNode } from "react";
import type { UseFormReturn } from "react-hook-form";
import { maskPhone } from "../../utils/masks";
import type { TutorFormValues } from "../../validators/tutorSchema";
import { FormField } from "../molecules/FormField";
import { Loading } from "../ui/Loading";

type TutorFormProps = {
  form: UseFormReturn<TutorFormValues>;
  onSubmit: (values: TutorFormValues) => void;
  onPhotoChange: (file: File | null) => void;
  submitLabel: string;
  actions?: ReactNode;
};

export const TutorForm = ({
  form,
  onSubmit,
  onPhotoChange,
  submitLabel,
  actions,
}: TutorFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <form className="form-card" onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Nome completo" error={errors.nome?.message}>
        <input type="text" {...register("nome")} required />
      </FormField>

      <FormField label="Telefone" error={errors.telefone?.message}>
        <input
          type="text"
          {...register("telefone", {
            onChange: (event) => {
              setValue("telefone", maskPhone(event.target.value));
            },
          })}
          required
        />
      </FormField>

      <FormField label="Endereço" error={errors.endereco?.message}>
        <input type="text" {...register("endereco")} required />
      </FormField>

      <FormField label="Foto do tutor">
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
