import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { petsService } from "../services/petsService";
import { tutorsService } from "../services/tutorsService";
import { getErrorMessage } from "../utils/errorHandler";
import { tutorSchema, type TutorFormValues } from "../validators/tutorSchema";
import type { PetResponseCompletoDto } from "../types/pets";
import type { TutorResponseComPetsDto } from "../types/tutors";

export const useTutorDetail = (id?: string) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [tutorData, setTutorData] = useState<TutorResponseComPetsDto | null>(null);
  const [petIdToLink, setPetIdToLink] = useState("");
  const [availablePets, setAvailablePets] = useState<PetResponseCompletoDto[]>([]);
  const [isLoadingPets, setIsLoadingPets] = useState(false);

  const form = useForm<TutorFormValues>({
    resolver: zodResolver(tutorSchema),
    defaultValues: {
      nome: "",
      telefone: "",
      endereco: "",
    },
  });

  const fetchTutor = async (tutorId: number) => {
    const response = await tutorsService.getById(tutorId);
    setTutorData(response);
    form.reset({
      nome: response.nome ?? "",
      telefone: response.telefone ?? "",
      endereco: response.endereco ?? "",
    });
    return response;
  };

  const fetchAvailablePets = async (linkedPets?: Array<{ id: number }>) => {
    setIsLoadingPets(true);
    try {
      const response = await petsService.list({ page: 0, size: 200 });
      const linkedIds = new Set(linkedPets?.map((pet) => pet.id) ?? []);
      const filteredPets = response.content.filter((pet) => !linkedIds.has(pet.id));
      
      // Buscar detalhes completos de cada pet (incluindo tutores vinculados)
      const petsWithDetails = await Promise.all(
        filteredPets.map((pet) => petsService.getById(pet.id))
      );
      setAvailablePets(petsWithDetails);
    } finally {
      setIsLoadingPets(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const loadTutor = async () => {
      if (!id) {
        setError("ID do tutor não informado.");
        setIsLoading(false);
        return;
      }
      try {
        const response = await fetchTutor(Number(id));
        if (isMounted) {
          await fetchAvailablePets(response.pets);
        }
      } catch (err) {
        if (isMounted) {
          setError(getErrorMessage(err, "Não foi possível carregar o tutor."));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadTutor();
    return () => {
      isMounted = false;
    };
  }, [id, form]);

  const onSubmit = async (values: TutorFormValues) => {
    if (!id) {
      setError("ID do tutor não informado.");
      return;
    }
    setError(null);
    try {
      await tutorsService.update(Number(id), values);
      if (photoFile) {
        await tutorsService.uploadPhoto(Number(id), photoFile);
      }
      const response = await fetchTutor(Number(id));
      await fetchAvailablePets(response.pets);
    } catch (err) {
      setError(getErrorMessage(err, "Não foi possível atualizar o tutor."));
    }
  };

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const confirmRemove = async () => {
    if (!id) {
      setError("ID do tutor não informado.");
      return;
    }
    setIsRemoving(true);
    try {
      await tutorsService.remove(Number(id));
      navigate("/tutores", { replace: true });
    } catch (err) {
      setError(getErrorMessage(err, "Não foi possível excluir o tutor."));
      setIsRemoving(false);
      closeDeleteModal();
    }
  };

  const handleLinkPet = async () => {
    if (!id || !petIdToLink) {
      setError("Informe o ID do pet para vincular.");
      return;
    }
    setError(null);
    try {
      await tutorsService.linkPet(Number(id), Number(petIdToLink));
      const response = await fetchTutor(Number(id));
      await fetchAvailablePets(response.pets);
      setPetIdToLink("");
    } catch (err) {
      setError(getErrorMessage(err, "Não foi possível vincular o pet."));
    }
  };

  const handleUnlinkPet = async (petId: number) => {
    if (!id) {
      setError("ID do tutor não informado.");
      return;
    }
    setError(null);
    try {
      await tutorsService.unlinkPet(Number(id), petId);
      const response = await fetchTutor(Number(id));
      await fetchAvailablePets(response.pets);
    } catch (err) {
      setError(getErrorMessage(err, "Não foi possível remover o vínculo."));
    }
  };

  return {
    form,
    isLoading,
    isRemoving,
    isDeleteModalOpen,
    error,
    tutorData,
    petIdToLink,
    availablePets,
    isLoadingPets,
    setPetIdToLink,
    setPhotoFile,
    onSubmit,
    openDeleteModal,
    closeDeleteModal,
    confirmRemove,
    handleLinkPet,
    handleUnlinkPet,
  };
};
