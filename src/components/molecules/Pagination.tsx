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
    <div className="pagination">
      <button className="app-button ghost" type="button" onClick={onPrev} disabled={isPrevDisabled}>
        Anterior
      </button>
      <span>
        Página {page + 1} de {totalPages}
      </span>
      <button className="app-button ghost" type="button" onClick={onNext} disabled={isNextDisabled}>
        Próxima
      </button>
    </div>
  );
};
