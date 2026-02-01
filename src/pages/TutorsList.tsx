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
    <section className="flex flex-col gap-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Tutores</h2>
          <p className="text-sm text-slate-500">Gerencie os tutores cadastrados no sistema.</p>
        </div>
        <Link
          className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-200/50 transition hover:bg-blue-800"
          to="/tutores/new"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Novo tutor
        </Link>
      </header>

      <form
        className="grid gap-4 rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm md:grid-cols-[1fr_auto]"
        onSubmit={handleFilterSubmit}
      >
        <label className="grid gap-1.5 text-sm font-medium text-slate-700">
          Nome
          <input
            type="text"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            placeholder="Ex: João"
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
        </label>
        <div className="flex items-end gap-2">
          <button
            className="h-10 rounded-xl bg-blue-700 px-5 text-sm font-semibold text-white transition hover:bg-blue-800"
            type="submit"
          >
            Filtrar
          </button>
          <button
            className="h-10 rounded-xl bg-slate-100 px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-200"
            type="button"
            onClick={handleReset}
          >
            Limpar
          </button>
        </div>
      </form>

      {isLoading ? <Loading label="Carregando tutores..." /> : null}
      {error ? <ErrorState message={error} /> : null}

      {!isLoading && !error && data?.content?.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.content.map((tutor) => {
            const photoUrl = resolveApiUrl(tutor.foto?.url);
            return (
              <Link
                to={`/tutores/${tutor.id}`}
                className="group overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm transition hover:shadow-md"
                key={tutor.id}
              >
                {photoUrl ? (
                  <img
                    className="h-40 w-full object-cover transition group-hover:scale-105"
                    src={photoUrl}
                    alt={`Foto de ${tutor.nome}`}
                  />
                ) : (
                  <div className="flex h-40 items-center justify-center bg-slate-100 text-sm text-slate-400">
                    Sem foto
                  </div>
                )}
                <div className="grid gap-1 p-4">
                  <div className="flex items-center gap-2">
                    <strong className="text-base font-semibold text-slate-900">{tutor.nome}</strong>
                    {tutor.petCount === 0 && (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
                        Sem pets
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-slate-500">
                    {tutor.telefone ?? "Telefone não informado"}
                  </span>
                  <span className="text-sm text-slate-500">
                    {tutor.email ?? "Email não informado"}
                  </span>
                </div>
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
            <Link
              className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-200/50 transition hover:bg-blue-800"
              to="/tutores/new"
            >
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
