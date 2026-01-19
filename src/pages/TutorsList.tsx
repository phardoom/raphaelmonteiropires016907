import { Link } from "react-router-dom";
import { EmptyState } from "../components/ui/EmptyState";
import { ErrorState } from "../components/ui/ErrorState";
import { Pagination } from "../components/molecules/Pagination";
import { Loading } from "../components/ui/Loading";
import { useTutorsList } from "../hooks/useTutorsList";
import { resolveApiUrl } from "../utils/urls";

export const TutorsList = () => {
  const {
    data,
    isLoading,
    error,
    nome,
    page,
    setNome,
    handleFilterSubmit,
    handleReset,
    handleNextPage,
    handlePrevPage,
  } = useTutorsList();

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <h2>Tutores</h2>
          <p>Gerencie os tutores cadastrados no sistema.</p>
        </div>
        <Link className="app-button primary" to="/tutores/new">
          Novo tutor
        </Link>
      </header>

      <form className="filters" onSubmit={handleFilterSubmit}>
        <label>
          Nome
          <input
            type="text"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            placeholder="Ex: João"
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

      {isLoading ? <Loading label="Carregando tutores..." /> : null}
      {error ? <ErrorState message={error} /> : null}

      {!isLoading && !error && data?.content?.length ? (
        <div className="cards">
          {data.content.map((tutor) => {
            const photoUrl = resolveApiUrl(tutor.foto?.url);
            return (
              <Link to={`/tutores/${tutor.id}`} className="card" key={tutor.id}>
                {photoUrl ? (
                  <img
                    className="tutor-photo"
                    src={photoUrl}
                    alt={`Foto de ${tutor.nome}`}
                  />
                ) : (
                  <div className="tutor-photo-placeholder">Sem foto</div>
                )}
                <strong>{tutor.nome}</strong>
                <span>{tutor.telefone ?? "Telefone não informado"}</span>
                <span>{tutor.email ?? "Email não informado"}</span>
              </Link>
            );
          })}
        </div>
      ) : null}

      {!isLoading && !error && data && data.content.length === 0 ? (
        <EmptyState
          title="Nenhum tutor encontrado"
          message="Cadastre o primeiro tutor para começar."
          action={
            <Link className="app-button primary" to="/tutores/new">
              Cadastrar tutor
            </Link>
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
