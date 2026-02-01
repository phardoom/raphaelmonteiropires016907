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
    petPhotoUrl,
    tutores,
    setPhotoFile,
    onSubmit,
    openDeleteModal,
    closeDeleteModal,
    confirmRemove,
  } = usePetDetail(id);

  const photoUrl = resolveApiUrl(petPhotoUrl ?? undefined);

  if (isLoading) {
    return <Loading label="Carregando pet..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <section className="flex flex-col gap-6">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            {petName || "Detalhes do pet"}
          </h2>
          <p className="text-sm text-slate-500">Atualize as informações do pet.</p>
        </div>
        <button
          className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
          type="button"
          onClick={openDeleteModal}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
          Excluir pet
        </button>
      </header>

      {/* Layout em duas colunas */}
      <div className="grid gap-6 xl:grid-cols-[300px_1fr]">
        {/* Coluna esquerda - Foto do Pet */}
        <div className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={petName}
                className="aspect-square w-full object-cover"
              />
            ) : (
              <div className="flex aspect-square w-full flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-50">
                <svg className="h-16 w-16 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                <span className="mt-2 text-sm text-slate-400">Sem foto</span>
              </div>
            )}
            <div className="border-t border-slate-100 p-4">
              <h3 className="text-lg font-semibold text-slate-900">{petName}</h3>
              <div className="mt-2 flex items-center gap-2">
                {tutores.length > 0 ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    {tutores.length} tutor{tutores.length > 1 ? "es" : ""} vinculado{tutores.length > 1 ? "s" : ""}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                    Sem tutor vinculado
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Coluna direita - Formulário e Tutores */}
        <div className="flex flex-col gap-6">
          {/* Formulário */}
          <div className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-4">
              <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
              <h3 className="text-base font-semibold text-slate-900">Editar informações</h3>
            </div>
            <PetForm
              form={form}
              onSubmit={onSubmit}
              onPhotoChange={setPhotoFile}
              submitLabel="Salvar alterações"
            />
          </div>

          {/* Tutores vinculados */}
          <div className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                </svg>
                <h3 className="text-base font-semibold text-slate-900">Tutores vinculados</h3>
                {tutores.length > 0 && (
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                    {tutores.length}
                  </span>
                )}
              </div>
              <Link
                to="/tutores"
                className="text-sm font-medium text-blue-600 transition hover:text-blue-800"
              >
                Ver todos
              </Link>
            </div>

            {tutores.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {tutores.map((tutor) => {
                  const tutorPhotoUrl = resolveApiUrl(tutor.foto?.url);
                  return (
                    <Link
                      to={`/tutores/${tutor.id}`}
                      className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 transition hover:border-blue-200 hover:bg-blue-50"
                      key={tutor.id}
                    >
                      {tutorPhotoUrl ? (
                        <img
                          src={tutorPhotoUrl}
                          alt={tutor.nome}
                          className="h-11 w-11 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                          </svg>
                        </div>
                      )}
                      <div className="flex-1 overflow-hidden">
                        <p className="truncate text-sm font-semibold text-slate-900 group-hover:text-blue-700">
                          {tutor.nome}
                        </p>
                        <p className="flex items-center gap-1 truncate text-xs text-slate-500">
                          <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                          </svg>
                          {tutor.telefone ?? "Sem telefone"}
                        </p>
                      </div>
                      <svg className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center rounded-xl border border-dashed border-slate-200 bg-slate-50 py-8 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-slate-700">Nenhum tutor vinculado</p>
                <p className="mt-1 text-xs text-slate-500">
                  Para vincular, acesse a página do tutor desejado.
                </p>
                <Link
                  to="/tutores"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Vincular tutor
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de confirmação */}
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
    </section>
  );
};
