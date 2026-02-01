import { Link, useParams } from "react-router-dom";
import { PetForm } from "../components/forms/PetForm";
import { ConfirmModal } from "../components/ui/ConfirmModal";
import { ErrorState } from "../components/ui/ErrorState";
import { Loading } from "../components/ui/Loading";
import { usePetDetail } from "../hooks/usePetDetail";
import { resolveApiUrl } from "../utils/urls";

export const PetDetail = () => {
  const { id } = useParams();
  const {
    form,
    isLoading,
    isRemoving,
    isDeleteModalOpen,
    error,
    petName,
    tutores,
    setPhotoFile,
    onSubmit,
    openDeleteModal,
    closeDeleteModal,
    confirmRemove,
  } = usePetDetail(id);

  if (isLoading) {
    return <Loading label="Carregando pet..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <section className="flex flex-col gap-8">
      <header>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          {petName || "Detalhes do pet"}
        </h2>
        <p className="text-sm text-slate-500">Atualize as informações do pet.</p>
      </header>

      <PetForm
        form={form}
        onSubmit={onSubmit}
        onPhotoChange={setPhotoFile}
        submitLabel="Salvar alterações"
        actions={
          <button
            className="rounded-xl bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
            type="button"
            onClick={openDeleteModal}
          >
            Excluir pet
          </button>
        }
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Excluir pet"
        message={`Tem certeza que deseja excluir "${petName}"? Esta ação não pode ser desfeita.`}
        details={
          tutores.length > 0
            ? [`Este pet está vinculado a ${tutores.length} tutor${tutores.length > 1 ? "es" : ""}`]
            : undefined
        }
        confirmLabel="Sim, excluir"
        cancelLabel="Cancelar"
        variant="danger"
        isLoading={isRemoving}
        onConfirm={confirmRemove}
        onCancel={closeDeleteModal}
      />

      <section className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-slate-900">Tutores vinculados</h3>

        {tutores.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tutores.map((tutor) => {
              const photoUrl = resolveApiUrl(tutor.foto?.url);
              return (
                <Link
                  to={`/tutores/${tutor.id}`}
                  className="group flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm transition hover:shadow-md"
                  key={tutor.id}
                >
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt={tutor.nome}
                      className="h-12 w-12 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                      </svg>
                    </div>
                  )}
                  <div className="flex-1 overflow-hidden">
                    <strong className="block truncate text-sm font-semibold text-slate-900">
                      {tutor.nome}
                    </strong>
                    <span className="block truncate text-xs text-slate-500">
                      {tutor.telefone ?? "Sem telefone"}
                    </span>
                    <span className="block truncate text-xs text-slate-500">
                      {tutor.email ?? "Sem email"}
                    </span>
                  </div>
                  <svg
                    className="h-5 w-5 shrink-0 text-slate-300 transition group-hover:text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-start gap-2 rounded-2xl border border-dashed border-slate-300 bg-white p-6">
            <strong className="text-base font-semibold text-slate-900">
              Nenhum tutor vinculado
            </strong>
            <span className="text-sm text-slate-500">
              Para vincular este pet a um tutor, acesse a página do tutor desejado.
            </span>
            <Link
              to="/tutores"
              className="mt-2 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-200/50 transition hover:bg-blue-800"
            >
              Ver tutores
            </Link>
          </div>
        )}
      </section>
    </section>
  );
};
