type PaginationProps = {
  page: number;
  pageCount: number;
  onPrev: () => void;
  onNext: () => void;
};

export const Pagination = ({ page, pageCount, onPrev, onNext }: PaginationProps) => {
  const totalPages = pageCount || 1;
  const isPrevDisabled = page === 0;
  const isNextDisabled = pageCount ? page >= pageCount - 1 : true;

  return (
    <div className="flex items-center justify-center gap-3">
      <button
        className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
        type="button"
        onClick={onPrev}
        disabled={isPrevDisabled}
      >
        Anterior
      </button>
      <span className="text-sm text-slate-500">
        Página {page + 1} de {totalPages}
      </span>
      <button
        className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
        type="button"
        onClick={onNext}
        disabled={isNextDisabled}
      >
        Próxima
      </button>
    </div>
  );
};
