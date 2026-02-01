import type { ReactNode } from "react";
import type { UseFormReturn } from "react-hook-form";
import { maskPhone } from "../../utils/masks";
import type { TutorFormValues } from "../../validators/tutorSchema";
import { ImageUpload } from "../ui/ImageUpload";

type TutorFormProps = {
  form: UseFormReturn<TutorFormValues>;
  onSubmit: (values: TutorFormValues) => void;
  onPhotoChange: (file: File | null) => void;
  submitLabel: string;
  actions?: ReactNode;
  currentPhotoUrl?: string;
};

export const TutorForm = ({
  form,
  onSubmit,
  onPhotoChange,
  submitLabel,
  actions,
  currentPhotoUrl,
}: TutorFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <form
      className="flex flex-col gap-5 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="grid gap-1.5 text-sm font-medium text-slate-700">
        Nome completo
        <input
          type="text"
          {...register("nome")}
          required
          className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
        />
        {errors.nome?.message && (
          <span className="text-xs text-red-600">{errors.nome.message}</span>
        )}
      </label>

      <label className="grid gap-1.5 text-sm font-medium text-slate-700">
        Telefone
        <input
          type="text"
          {...register("telefone", {
            onChange: (event) => {
              setValue("telefone", maskPhone(event.target.value));
            },
          })}
          required
          className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
        />
        {errors.telefone?.message && (
          <span className="text-xs text-red-600">{errors.telefone.message}</span>
        )}
      </label>

      <label className="grid gap-1.5 text-sm font-medium text-slate-700">
        Endereço
        <input
          type="text"
          {...register("endereco")}
          required
          className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
        />
        {errors.endereco?.message && (
          <span className="text-xs text-red-600">{errors.endereco.message}</span>
        )}
      </label>

      <ImageUpload
        label="Foto do tutor"
        currentImageUrl={currentPhotoUrl}
        onFileChange={onPhotoChange}
      />

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          className="rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-200/50 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Salvando..." : submitLabel}
        </button>
        {actions ?? null}
      </div>
    </form>
  );
};
