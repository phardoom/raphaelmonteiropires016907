import { useParams } from "react-router-dom";
import { PetForm } from "../components/forms/PetForm";
import { ErrorState } from "../components/ui/ErrorState";
import { Loading } from "../components/ui/Loading";
import { usePetDetail } from "../hooks/usePetDetail";

export const PetDetail = () => {
  const { id } = useParams();
  const {
    form,
    isLoading,
    isRemoving,
    error,
    petName,
    tutores,
    setPhotoFile,
    onSubmit,
    handleRemove,
  } = usePetDetail(id);

  if (isLoading) {
    return <Loading label="Carregando pet..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <h2 className="highlight-title">{petName || "Detalhes do pet"}</h2>
          <p>Atualize as informações do pet.</p>
        </div>
      </header>

      <PetForm
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
            {isRemoving ? <Loading label="Excluindo..." /> : "Excluir pet"}
          </button>
        }
      />

      {tutores.length ? (
        <section className="page">
          <h3>Tutores vinculados</h3>
          <div className="cards">
            {tutores.map((tutor) => (
              <div className="card" key={tutor.id}>
                <strong>{tutor.nome}</strong>
                <span>{tutor.telefone ?? "Telefone não informado"}</span>
                <span>{tutor.email ?? "Email não informado"}</span>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <div className="state state-empty">
          <strong>Nenhum tutor vinculado</strong>
          <span>Vincule o pet a um tutor para exibir os dados.</span>
        </div>
      )}
    </section>
  );
};
