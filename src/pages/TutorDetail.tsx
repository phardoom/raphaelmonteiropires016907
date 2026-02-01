import { useParams } from "react-router-dom";
import { TutorForm } from "../components/forms/TutorForm";
import { ConfirmModal } from "../components/ui/ConfirmModal";
import { ErrorState } from "../components/ui/ErrorState";
import { Loading } from "../components/ui/Loading";
import { useTutorDetail } from "../hooks/useTutorDetail";
import { resolveApiUrl } from "../utils/urls";

export const TutorDetail = () => {
  const { id } = useParams();
  const {
    form,
    isLoading,
    isRemoving,
    isDeleteModalOpen,
    error,
    tutorData,
    petIdToLink,
    availablePets,
    isLoadingPets,
    setPetIdToLink,
    setPhotoFile,
    onSubmit,
    openDeleteModal,
    closeDeleteModal,
    confirmRemove,
    handleLinkPet,
    handleUnlinkPet,
  } = useTutorDetail(id);

  if (isLoading) {
    return <Loading label="Carregando tutor..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <section className="flex flex-col gap-6">
      <header>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Detalhes do tutor
        </h2>
        <p className="text-sm text-slate-500">Atualize os dados do tutor.</p>
      </header>

      <div className="grid gap-6 xl:grid-cols-2">
        {/* Coluna esquerda: Formulário */}
        <div className="flex flex-col gap-4">
          <TutorForm
            form={form}
            onSubmit={onSubmit}
            onPhotoChange={setPhotoFile}
            submitLabel="Salvar alterações"
            currentPhotoUrl={resolveApiUrl(tutorData?.foto?.url)}
            actions={
              <button
                className="rounded-xl bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
                type="button"
                onClick={openDeleteModal}
              >
                Excluir tutor
              </button>
            }
          />
        </div>

        {/* Coluna direita: Vinculação de pets */}
        <div className="flex flex-col gap-4">
          <section className="flex flex-col gap-4 rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Vincular pet</h3>
              <p className="text-xs text-slate-500">
                Selecione um pet disponível para vincular.
              </p>
            </div>

            {isLoadingPets ? (
              <Loading label="Carregando..." />
            ) : availablePets.length === 0 ? (
              <div className="rounded-xl bg-slate-50 p-3 text-center text-xs text-slate-500">
                Não há pets disponíveis para vincular.
              </div>
            ) : (
              <>
                <div className="max-h-48 overflow-y-auto rounded-xl border border-slate-100 bg-slate-50/50 p-2">
                  <div className="grid gap-2">
                    {availablePets.map((pet) => {
                      const isSelected = String(pet.id) === petIdToLink;
                      const photoUrl = resolveApiUrl(pet.foto?.url);
                      const tutorCount = pet.tutores?.length ?? 0;
                      return (
                        <button
                          key={pet.id}
                          type="button"
                          onClick={() => setPetIdToLink(isSelected ? "" : String(pet.id))}
                          className={`flex items-center gap-2 rounded-lg border p-2 text-left transition ${
                            isSelected
                              ? "border-blue-500 bg-blue-50"
                              : "border-transparent bg-white hover:border-blue-200 hover:bg-blue-50/50"
                          }`}
                        >
                          {photoUrl ? (
                            <img src={photoUrl} alt={pet.nome} className="h-8 w-8 rounded-lg object-cover" />
                          ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
                              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8.35 3c1.18-.17 2.43 1.12 2.79 2.9.36 1.77-.29 3.35-1.47 3.53-1.17.18-2.43-1.11-2.8-2.89-.37-1.77.3-3.35 1.48-3.54Zm7.15 0c1.18.19 1.85 1.77 1.48 3.54-.37 1.78-1.63 3.07-2.8 2.89-1.18-.18-1.83-1.76-1.47-3.53.36-1.78 1.61-3.07 2.79-2.9ZM3 10.5c1.1-.24 2.27.88 2.61 2.5.34 1.62-.28 3.13-1.38 3.38-1.1.24-2.28-.89-2.62-2.5-.33-1.62.29-3.13 1.39-3.38Zm18 0c1.1.25 1.72 1.76 1.39 3.38-.34 1.61-1.52 2.74-2.62 2.5-1.1-.25-1.72-1.76-1.38-3.38.34-1.62 1.51-2.74 2.61-2.5ZM12 12c2.21 0 4 2.79 4 5a4 4 0 0 1-8 0c0-2.21 1.79-5 4-5Z"/>
                              </svg>
                            </div>
                          )}
                          <div className="flex flex-1 items-center gap-2 overflow-hidden">
                            <span className="truncate text-sm font-medium text-slate-800">{pet.nome}</span>
                            {tutorCount > 0 && (
                              <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                                {tutorCount} {tutorCount === 1 ? "tutor" : "tutores"}
                              </span>
                            )}
                          </div>
                          {isSelected && (
                            <svg className="h-4 w-4 shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  className="rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
                  type="button"
                  onClick={handleLinkPet}
                  disabled={!petIdToLink}
                >
                  Vincular pet
                </button>
              </>
            )}
          </section>

          <section className="flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">Pets vinculados</h3>

            {tutorData?.pets?.length ? (
              <div className="grid gap-2">
                {tutorData.pets.map((pet) => (
                  <div
                    className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3"
                    key={pet.id}
                  >
                    {pet.foto?.url ? (
                      <img
                        className="h-10 w-10 rounded-lg object-cover"
                        src={resolveApiUrl(pet.foto.url)}
                        alt={`Foto de ${pet.nome}`}
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-200 text-slate-400">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8.35 3c1.18-.17 2.43 1.12 2.79 2.9.36 1.77-.29 3.35-1.47 3.53-1.17.18-2.43-1.11-2.8-2.89-.37-1.77.3-3.35 1.48-3.54Zm7.15 0c1.18.19 1.85 1.77 1.48 3.54-.37 1.78-1.63 3.07-2.8 2.89-1.18-.18-1.83-1.76-1.47-3.53.36-1.78 1.61-3.07 2.79-2.9ZM3 10.5c1.1-.24 2.27.88 2.61 2.5.34 1.62-.28 3.13-1.38 3.38-1.1.24-2.28-.89-2.62-2.5-.33-1.62.29-3.13 1.39-3.38Zm18 0c1.1.25 1.72 1.76 1.39 3.38-.34 1.61-1.52 2.74-2.62 2.5-1.1-.25-1.72-1.76-1.38-3.38.34-1.62 1.51-2.74 2.61-2.5ZM12 12c2.21 0 4 2.79 4 5a4 4 0 0 1-8 0c0-2.21 1.79-5 4-5Z"/>
                        </svg>
                      </div>
                    )}
                    <div className="flex-1">
                      <strong className="block text-sm font-medium text-slate-900">{pet.nome}</strong>
                      <span className="text-xs text-slate-500">{pet.raca ?? "Sem raça"}</span>
                    </div>
                    <button
                      className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100"
                      type="button"
                      onClick={() => handleUnlinkPet(pet.id)}
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl bg-slate-50 p-4 text-center text-sm text-slate-500">
                Nenhum pet vinculado a este tutor.
              </div>
            )}
          </section>
        </div>
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Excluir tutor"
        message={`Tem certeza que deseja excluir "${tutorData?.nome}"? Esta ação não pode ser desfeita.`}
        details={
          tutorData?.pets?.length
            ? [`Este tutor possui ${tutorData.pets.length} pet${tutorData.pets.length > 1 ? "s" : ""} vinculado${tutorData.pets.length > 1 ? "s" : ""}`]
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
