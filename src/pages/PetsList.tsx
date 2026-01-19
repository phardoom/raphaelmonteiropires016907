import { Link } from "react-router-dom";
import { EmptyState } from "../components/ui/EmptyState";
import { ErrorState } from "../components/ui/ErrorState";
import { Pagination } from "../components/molecules/Pagination";
import { Loading } from "../components/ui/Loading";
import { usePetsList } from "../hooks/usePetsList";
import { resolveApiUrl } from "../utils/urls";

export const PetsList = () => {
  const {
    data,
    isLoading,
    error,
    nome,
    raca,
    page,
    hasActiveFilters,
    setNome,
    setRaca,
    handleFilterSubmit,
    handleReset,
    handleNextPage,
    handlePrevPage,
  } = usePetsList();

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <h2>Pets</h2>
          <p>Gerencie os pets cadastrados no sistema.</p>
        </div>
        <Link className="app-button primary" to="/pets/new">
          Novo pet
        </Link>
      </header>

      <form className="filters" onSubmit={handleFilterSubmit}>
        <label>
          Nome
          <input
            type="text"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            placeholder="Ex: Rex"
          />
        </label>
        <label>
          Raça
          <input
            type="text"
            value={raca}
            onChange={(event) => setRaca(event.target.value)}
            placeholder="Ex: Labrador"
          />
        </label>
        <div className="filters-actions">
          <button className="app-button primary" type="submit">
            Filtrar
          </button>
          <button className="app-button ghost" type="button" onClick={handleReset}>
            Limpar
          </button>
        </div>
      </form>

      {isLoading ? <Loading label="Carregando pets..." /> : null}

      {error ? <ErrorState message={error} /> : null}

      {!isLoading && !error && data?.content?.length ? (
        <div className="pets-grid">
          {data.content.map((pet) => {
            const photoUrl = resolveApiUrl(pet.foto?.url);
            return (
              <Link to={`/pets/${pet.id}`} className="pet-card" key={pet.id}>
                {photoUrl ? (
                  <img src={photoUrl} alt={pet.nome} />
                ) : (
                  <div className="pet-placeholder">Sem foto</div>
                )}
                <div className="pet-card-content">
                  <strong>{pet.nome}</strong>
                  <span>Espécie/Raça: {pet.raca ?? "Não informado"}</span>
                  <span>Idade: {pet.idade ?? "Não informado"}</span>
                </div>
              </Link>
            );
          })}
        </div>
      ) : null}

      {!isLoading && !error && data && data.content.length === 0 ? (
        <EmptyState
          title={hasActiveFilters ? "Nenhum pet encontrado" : "Nenhum pet cadastrado"}
          message={
            hasActiveFilters
              ? "Tente ajustar os filtros para encontrar resultados."
              : "Cadastre o primeiro pet para começar."
          }
          action={
            hasActiveFilters ? null : (
              <Link className="app-button primary" to="/pets/new">
                Cadastrar pet
              </Link>
            )
          }
        />
      ) : null}

      {!isLoading && !error && data ? (
        <Pagination
          page={page}
          pageCount={data.pageCount || 1}
          onPrev={handlePrevPage}
          onNext={handleNextPage}
        />
      ) : null}
    </section>
  );
};
