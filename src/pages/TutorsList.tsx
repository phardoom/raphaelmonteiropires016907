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

  const hasActiveFilters = Boolean(nome);

  return (
    <section className="flex flex-col gap-6">
      {/* Header */}
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

      {/* Filtros */}
      <div className="rounded-2xl border border-slate-200/70 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
            </svg>
            <span className="text-sm font-medium text-slate-700">Filtros</span>
            {hasActiveFilters && (
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                1 ativo
              </span>
            )}
          </div>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1 text-xs font-medium text-slate-500 transition hover:text-red-600"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
              Limpar filtros
            </button>
          )}
        </div>

        <form className="grid gap-4 p-5 md:grid-cols-[1fr_auto]" onSubmit={handleFilterSubmit}>
          <div className="relative">
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500">
              Nome do tutor
            </label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input
                type="text"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                placeholder="Buscar por nome..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="flex items-end">
            <button
              className="h-11 rounded-xl bg-blue-700 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 focus:ring-4 focus:ring-blue-200"
              type="submit"
            >
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                Buscar
              </span>
            </button>
          </div>
        </form>
      </div>

      {/* Loading */}
      {isLoading ? <Loading label="Carregando tutores..." /> : null}

      {/* Error */}
      {error ? <ErrorState message={error} /> : null}

      {/* Results Header */}
      {!isLoading && !error && data && data.content.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Exibindo{" "}
            <span className="font-semibold text-slate-900">{data.content.length}</span> de{" "}
            <span className="font-semibold text-slate-900">{data.total}</span> tutor{data.total !== 1 ? "es" : ""}
            {hasActiveFilters && (
              <span className="ml-1 text-blue-600">(filtrado)</span>
            )}
          </p>
        </div>
      )}

      {/* Grid de Tutores */}
      {!isLoading && !error && data?.content?.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.content.map((tutor) => {
            const photoUrl = resolveApiUrl(tutor.foto?.url);
            return (
              <Link
                to={`/tutores/${tutor.id}`}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm transition hover:border-blue-200 hover:shadow-lg"
                key={tutor.id}
              >
                {/* Imagem */}
                <div className="relative overflow-hidden">
                  {photoUrl ? (
                    <img
                      className="h-44 w-full object-cover transition duration-300 group-hover:scale-105"
                      src={photoUrl}
                      alt={`Foto de ${tutor.nome}`}
                    />
                  ) : (
                    <div className="flex h-44 flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-50">
                      <svg className="h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                      </svg>
                      <span className="mt-1 text-xs text-slate-400">Sem foto</span>
                    </div>
                  )}
                  {/* Badge Sem Pets */}
                  {tutor.petCount === 0 && (
                    <div className="absolute right-2 top-2">
                      <span className="rounded-full bg-amber-500 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                        Sem pets
                      </span>
                    </div>
                  )}
                </div>

                {/* Conteúdo */}
                <div className="p-4">
                  <div className="mb-2 flex items-start justify-between">
                    <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-700">
                      {tutor.nome}
                    </h3>
                    <svg className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <p className="flex items-center gap-1.5 text-sm text-slate-500">
                      <svg className="h-3.5 w-3.5 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                      </svg>
                      {tutor.telefone ?? "Telefone não informado"}
                    </p>
                    <p className="flex items-center gap-1.5 text-sm text-slate-500">
                      <svg className="h-3.5 w-3.5 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                      </svg>
                      {tutor.email ?? "Email não informado"}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : null}

      {/* Empty State */}
      {!isLoading && !error && data && data.content.length === 0 ? (
        <EmptyState
          title={hasActiveFilters ? "Nenhum tutor encontrado" : "Nenhum tutor cadastrado"}
          message={
            hasActiveFilters
              ? "Tente ajustar os filtros para encontrar resultados."
              : "Cadastre o primeiro tutor para começar."
          }
          action={
            hasActiveFilters ? (
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
              >
                Limpar filtros
              </button>
            ) : (
              <Link
                className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-200/50 transition hover:bg-blue-800"
                to="/tutores/new"
              >
                Cadastrar tutor
              </Link>
            )
          }
        />
      ) : null}

      {/* Paginação */}
      {!isLoading && !error && data && data.pageCount > 1 ? (
        <Pagination
          page={page}
          pageCount={data.pageCount}
          onPrev={handlePrevPage}
          onNext={handleNextPage}
        />
      ) : null}
    </section>
  );
};
