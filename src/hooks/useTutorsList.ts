import { FormEvent, useEffect, useMemo, useState } from "react";
import { tutorsService } from "../services/tutorsService";
import type { PagedTutorWithPetCountDto } from "../types/tutors";
import { getErrorMessage } from "../utils/errorHandler";

type TutorsListState = {
  data: PagedTutorWithPetCountDto | null;
  isLoading: boolean;
  error: string | null;
  nome: string;
  page: number;
  size: number;
};

export const useTutorsList = () => {
  const [state, setState] = useState<TutorsListState>({
    data: null,
    isLoading: true,
    error: null,
    nome: "",
    page: 0,
    size: 10,
  });
  const [filters, setFilters] = useState({ nome: "" });

  const params = useMemo(
    () => ({
      page: state.page,
      size: state.size,
      nome: filters.nome || undefined,
    }),
    [filters, state.page, state.size]
  );

  useEffect(() => {
    let isMounted = true;

    const fetchTutors = async () => {
      setState((current) => ({ ...current, isLoading: true, error: null }));
      try {
        const response = await tutorsService.list(params);

        // Buscar detalhes de cada tutor para obter contagem de pets
        const tutorsWithDetails = await Promise.all(
          response.content.map(async (tutor) => {
            try {
              const details = await tutorsService.getById(tutor.id);
              return {
                ...tutor,
                petCount: details.pets?.length ?? 0,
              };
            } catch {
              return { ...tutor, petCount: 0 };
            }
          })
        );

        if (isMounted) {
          setState((current) => ({
            ...current,
            data: {
              ...response,
              content: tutorsWithDetails,
            },
          }));
        }
      } catch (err) {
        if (isMounted) {
          setState((current) => ({
            ...current,
            error: getErrorMessage(err, "Não foi possível listar os tutores."),
          }));
        }
      } finally {
        if (isMounted) {
          setState((current) => ({ ...current, isLoading: false }));
        }
      }
    };

    fetchTutors();

    return () => {
      isMounted = false;
    };
  }, [params]);

  const handleFilterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFilters({
      nome: state.nome.trim(),
    });
    setState((current) => ({ ...current, page: 0 }));
  };

  const handleReset = () => {
    setState((current) => ({ ...current, nome: "", page: 0 }));
    setFilters({ nome: "" });
  };

  const handleNextPage = () => {
    setState((current) => ({
      ...current,
      page: current.data?.pageCount
        ? Math.min(current.data.pageCount - 1, current.page + 1)
        : current.page,
    }));
  };

  const handlePrevPage = () => {
    setState((current) => ({ ...current, page: Math.max(0, current.page - 1) }));
  };

  return {
    data: state.data,
    isLoading: state.isLoading,
    error: state.error,
    nome: state.nome,
    page: state.page,
    size: state.size,
    setNome: (value: string) =>
      setState((current) => ({ ...current, nome: value })),
    handleFilterSubmit,
    handleReset,
    handleNextPage,
    handlePrevPage,
  };
};
