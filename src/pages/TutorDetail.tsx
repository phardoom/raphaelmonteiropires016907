import { useParams } from "react-router-dom";
import { TutorForm } from "../components/forms/TutorForm";
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
    error,
    tutorData,
    petIdToLink,
    availablePets,
    isLoadingPets,
    setPetIdToLink,
    setPhotoFile,
    onSubmit,
    handleRemove,
    handleLinkPet,
    handleUnlinkPet,
  } = useTutorDetail(id);
  const selectedPet = availablePets.find((pet) => String(pet.id) === petIdToLink);

  if (isLoading) {
    return <Loading label="Carregando tutor..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <h2 className="highlight-title">Detalhes do tutor</h2>
          <p>Atualize os dados do tutor.</p>
        </div>
      </header>

      {(() => {
        const photoUrl = resolveApiUrl(tutorData?.foto?.url);
        return photoUrl ? (
          <div className="tutor-photo-preview">
            <span>Foto atual</span>
            <img
              className="tutor-photo"
              src={photoUrl}
              alt={`Foto de ${tutorData?.nome ?? "tutor"}`}
            />
          </div>
        ) : null;
      })()}

      <TutorForm
        form={form}
        onSubmit={onSubmit}
        onPhotoChange={setPhotoFile}
        submitLabel="Salvar alterações"
        actions={
          <button
            className="app-button ghost danger"
            type="button"
            onClick={handleRemove}
            disabled={isRemoving}
          >
            {isRemoving ? <Loading label="Excluindo..." /> : "Excluir tutor"}
          </button>
        }
      />

      <section className="page">
        <h3>Pets vinculados</h3>
        <div className="link-pet">
          <select
            value={petIdToLink}
            onChange={(event) => setPetIdToLink(event.target.value)}
            disabled={isLoadingPets || availablePets.length === 0}
          >
            <option value="">
              {isLoadingPets ? "Carregando pets..." : "Selecione um pet"}
            </option>
            {availablePets.map((pet) => (
              <option key={pet.id} value={pet.id}>
                {pet.nome}
              </option>
            ))}
          </select>
          <button
            className="app-button primary"
            type="button"
            onClick={handleLinkPet}
            disabled={!petIdToLink}
          >
            Vincular pet
          </button>
        </div>
        {selectedPet?.foto?.url ? (
          <img
            className="pet-preview"
            src={resolveApiUrl(selectedPet.foto.url)}
            alt={`Foto de ${selectedPet.nome}`}
          />
        ) : selectedPet ? (
          <div className="pet-placeholder pet-preview-placeholder">Sem foto</div>
        ) : null}

        {tutorData?.pets?.length ? (
          <div className="cards">
            {tutorData.pets.map((pet) => (
              <div className="card" key={pet.id}>
                {pet.foto?.url ? (
                  <img
                    className="pet-preview"
                    src={resolveApiUrl(pet.foto.url)}
                    alt={`Foto de ${pet.nome}`}
                  />
                ) : (
                  <div className="pet-placeholder pet-preview-placeholder">Sem foto</div>
                )}
                <strong>{pet.nome}</strong>
                <span>Espécie/Raça: {pet.raca ?? "Não informado"}</span>
                <span>Idade: {pet.idade ?? "Não informado"}</span>
                <button
                  className="app-button ghost danger"
                  type="button"
                  onClick={() => handleUnlinkPet(pet.id)}
                >
                  Remover vínculo
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="state state-empty">
            <strong>Nenhum pet vinculado</strong>
            <span>Vincule um pet para aparecer aqui.</span>
          </div>
        )}
      </section>
    </section>
  );
};
