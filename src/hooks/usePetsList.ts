import { FormEvent, useEffect, useMemo, useState } from "react";
import { petsService } from "../services/petsService";
import type { PagedPetResponseDto } from "../types/pets";
import { getErrorMessage } from "../utils/errorHandler";

type PetsListState = {
  data: PagedPetResponseDto | null;
  isLoading: boolean;
  error: string | null;
  nome: string;
  raca: string;
  page: number;
  size: number;
};

export const usePetsList = () => {
  const [state, setState] = useState<PetsListState>({
    data: null,
    isLoading: true,
    error: null,
    nome: "",
    raca: "",
    page: 0,
    size: 10,
  });
  const [filters, setFilters] = useState({ nome: "", raca: "" });

  const params = useMemo(
    () => ({
      page: state.page,
      size: state.size,
      nome: filters.nome || undefined,
      raca: filters.raca || undefined,
    }),
    [filters, state.page, state.size]
  );

  const hasActiveFilters = Boolean(filters.nome || filters.raca);

  const filteredData = useMemo(() => {
    if (!state.data || !hasActiveFilters) {
      return state.data;
    }

    const normalize = (value: string) => value.toLowerCase();
    const nomeFilter = normalize(filters.nome);
    const racaFilter = normalize(filters.raca);

    const content = state.data.content.filter((pet) => {
      const matchesNome = nomeFilter
        ? normalize(pet.nome ?? "").includes(nomeFilter)
        : true;
      const matchesRaca = racaFilter
        ? normalize(pet.raca ?? "").includes(racaFilter)
        : true;
      return matchesNome && matchesRaca;
    });

    return {
      ...state.data,
      page: 0,
      pageCount: content.length ? 1 : 0,
      total: content.length,
      content,
    };
  }, [filters.nome, filters.raca, hasActiveFilters, state.data]);

  useEffect(() => {
    let isMounted = true;

    const fetchPets = async () => {
      setState((current) => ({ ...current, isLoading: true, error: null }));
      try {
        const response = await petsService.list(params);
        if (isMounted) {
          setState((current) => ({ ...current, data: response }));
        }
      } catch (err) {
        if (isMounted) {
          setState((current) => ({
            ...current,
            error: getErrorMessage(err, "Não foi possível listar os pets."),
          }));
        }
      } finally {
        if (isMounted) {
          setState((current) => ({ ...current, isLoading: false }));
        }
      }
    };

    fetchPets();

    return () => {
      isMounted = false;
    };
  }, [params]);

  const handleFilterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFilters({
      nome: state.nome.trim(),
      raca: state.raca.trim(),
    });
    setState((current) => ({ ...current, page: 0 }));
  };

  const handleReset = () => {
    setState((current) => ({ ...current, nome: "", raca: "", page: 0 }));
    setFilters({ nome: "", raca: "" });
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
    data: filteredData,
    isLoading: state.isLoading,
    error: state.error,
    nome: state.nome,
    raca: state.raca,
    page: state.page,
    size: state.size,
    hasActiveFilters,
    setNome: (value: string) =>
      setState((current) => ({ ...current, nome: value })),
    setRaca: (value: string) =>
      setState((current) => ({ ...current, raca: value })),
    handleFilterSubmit,
    handleReset,
    handleNextPage,
    handlePrevPage,
  };
};
