import { Link, useLocation } from "react-router-dom";

// Mapeamento de rotas para labels amigáveis
const routeLabels: Record<string, string> = {
  pets: "Pets",
  tutores: "Tutores",
  new: "Novo",
};

// Função para traduzir segmentos da URL
const getSegmentLabel = (segment: string): string => {
  // Se for um número, é um ID
  if (/^\d+$/.test(segment)) {
    return `#${segment}`;
  }
  return routeLabels[segment] || segment;
};

export const Breadcrumb = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Se estiver na raiz, não mostra breadcrumb
  if (pathSegments.length === 0) {
    return null;
  }

  // Constrói os itens do breadcrumb
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const path = "/" + pathSegments.slice(0, index + 1).join("/");
    const isLast = index === pathSegments.length - 1;
    const label = getSegmentLabel(segment);

    return {
      label,
      path,
      isLast,
    };
  });

  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className="flex items-center gap-1 text-sm">
        {/* Home */}
        <li>
          <Link
            to="/pets"
            className="flex items-center gap-1 rounded-md px-2 py-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            <span className="sr-only sm:not-sr-only">Início</span>
          </Link>
        </li>

        {breadcrumbItems.map((item, index) => (
          <li key={item.path} className="flex items-center gap-1">
            {/* Separador */}
            <svg className="h-4 w-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>

            {item.isLast ? (
              <span
                className="rounded-md bg-blue-50 px-2 py-1 font-medium text-blue-700"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <Link
                to={item.path}
                className="rounded-md px-2 py-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
