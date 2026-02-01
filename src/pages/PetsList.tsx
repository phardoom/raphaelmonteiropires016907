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

  const activeFilterCount = [nome, raca].filter(Boolean).length;

  return (
    <section className="flex flex-col gap-6">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Pets</h2>
          <p className="text-sm text-slate-500">Gerencie os pets cadastrados no sistema.</p>
        </div>
        <Link
          className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-200/50 transition hover:bg-blue-800"
          to="/pets/new"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Novo pet
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
                {activeFilterCount} ativo{activeFilterCount > 1 ? "s" : ""}
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

        <form className="grid gap-4 p-5 md:grid-cols-[1fr_1fr_auto]" onSubmit={handleFilterSubmit}>
          <div className="relative">
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500">
              Nome do pet
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

          <div className="relative">
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500">
              Raça
            </label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
              </svg>
              <input
                type="text"
                value={raca}
                onChange={(event) => setRaca(event.target.value)}
                placeholder="Buscar por raça..."
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
      {isLoading ? <Loading label="Carregando pets..." /> : null}

      {/* Error */}
      {error ? <ErrorState message={error} /> : null}

      {/* Results Header */}
      {!isLoading && !error && data && data.content.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Exibindo{" "}
            <span className="font-semibold text-slate-900">{data.content.length}</span> de{" "}
            <span className="font-semibold text-slate-900">{data.total}</span> pet{data.total !== 1 ? "s" : ""}
            {hasActiveFilters && (
              <span className="ml-1 text-blue-600">(filtrado)</span>
            )}
          </p>
        </div>
      )}

      {/* Grid de Pets */}
      {!isLoading && !error && data?.content?.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.content.map((pet) => {
            const photoUrl = resolveApiUrl(pet.foto?.url);
            return (
              <Link
                to={`/pets/${pet.id}`}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm transition hover:border-blue-200 hover:shadow-lg"
                key={pet.id}
              >
                {/* Imagem */}
                <div className="relative overflow-hidden">
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt={pet.nome}
                      className="h-44 w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-44 flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-50">
                      <svg className="h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                      </svg>
                      <span className="mt-1 text-xs text-slate-400">Sem foto</span>
                    </div>
                  )}
                  {/* Badge Sem Tutor */}
                  {pet.tutorCount === 0 && (
                    <div className="absolute right-2 top-2">
                      <span className="rounded-full bg-amber-500 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                        Sem tutor
                      </span>
                    </div>
                  )}
                </div>

                {/* Conteúdo */}
                <div className="p-4">
                  <div className="mb-2 flex items-start justify-between">
                    <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-700">
                      {pet.nome}
                    </h3>
                    <svg className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <p className="flex items-center gap-1.5 text-sm text-slate-500">
                      <svg className="h-3.5 w-3.5 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                      </svg>
                      {pet.raca ?? "Raça não informada"}
                    </p>
                    <p className="flex items-center gap-1.5 text-sm text-slate-500">
                      <svg className="h-3.5 w-3.5 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                      </svg>
                      {pet.idade ? `${pet.idade} ano${pet.idade > 1 ? "s" : ""}` : "Idade não informada"}
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
          title={hasActiveFilters ? "Nenhum pet encontrado" : "Nenhum pet cadastrado"}
          message={
            hasActiveFilters
              ? "Tente ajustar os filtros para encontrar resultados."
              : "Cadastre o primeiro pet para começar."
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
                to="/pets/new"
              >
                Cadastrar pet
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
