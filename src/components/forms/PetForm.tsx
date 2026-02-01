import type { ReactNode } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { PetFormValues } from "../../validators/petSchema";

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
    <form
      className="flex flex-col gap-5 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="grid gap-1.5 text-sm font-medium text-slate-700">
        Nome
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
        Espécie / Raça
        <input
          type="text"
          {...register("raca")}
          className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
        />
        {errors.raca?.message && (
          <span className="text-xs text-red-600">{errors.raca.message}</span>
        )}
      </label>

      <label className="grid gap-1.5 text-sm font-medium text-slate-700">
        Idade
        <input
          type="number"
          min={0}
          {...register("idade")}
          className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
        />
        {errors.idade?.message && (
          <span className="text-xs text-red-600">{errors.idade.message}</span>
        )}
      </label>

      <label className="grid gap-1.5 text-sm font-medium text-slate-700">
        Foto do pet
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            const file = event.target.files?.[0];
            onPhotoChange(file ?? null);
          }}
          className="text-sm text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100"
        />
      </label>

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
