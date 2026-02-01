import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { petsService } from "../services/petsService";
import { tutorsService } from "../services/tutorsService";
import { getErrorMessage } from "../utils/errorHandler";
import type { TutorResponseDto } from "../types/tutors";
import { petSchema, type PetFormValues } from "../validators/petSchema";

export const usePetDetail = (id?: string) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isRemoving, setIsRemoving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [tutores, setTutores] = useState<TutorResponseDto[]>([]);
  const [petName, setPetName] = useState("");

  const form = useForm<PetFormValues>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      nome: "",
      raca: "",
      idade: undefined,
    },
  });

  useEffect(() => {
    let isMounted = true;

    const fetchPet = async () => {
      if (!id) {
        setError("ID do pet não informado.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await petsService.getById(Number(id));
        if (isMounted) {
          setPetName(response.nome ?? "");
          form.reset({
            nome: response.nome ?? "",
            raca: response.raca ?? "",
            idade: response.idade ?? undefined,
          });
          if (response.tutores?.length) {
            const tutors = await Promise.all(
              response.tutores.map((tutor) => tutorsService.getById(tutor.id))
            );
            setTutores(tutors);
          } else {
            setTutores([]);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(getErrorMessage(err, "Não foi possível carregar o pet."));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchPet();

    return () => {
      isMounted = false;
    };
  }, [id, form]);

  const onSubmit = async (values: PetFormValues) => {
    if (!id) {
      setError("ID do pet não informado.");
      return;
    }
    setError(null);
    try {
      await petsService.update(Number(id), {
        nome: values.nome.trim(),
        raca: values.raca?.trim() || undefined,
        idade: values.idade,
      });
      if (photoFile) {
        await petsService.uploadPhoto(Number(id), photoFile);
      }
      navigate("/pets", { replace: true });
    } catch (err) {
      setError(getErrorMessage(err, "Não foi possível atualizar o pet."));
    }
  };

  const handleRemove = async () => {
    if (!id) {
      setError("ID do pet não informado.");
      return;
    }
    const confirmed = window.confirm("Deseja realmente excluir este pet?");
    if (!confirmed) {
      return;
    }
    setError(null);
    setIsRemoving(true);
    try {
      await petsService.remove(Number(id));
      navigate("/pets", { replace: true });
    } catch (err) {
      setError(getErrorMessage(err, "Não foi possível excluir o pet."));
    } finally {
      setIsRemoving(false);
    }
  };

  return {
    form,
    isLoading,
    isRemoving,
    error,
    petName,
    tutores,
    setPhotoFile,
    onSubmit,
    handleRemove,
  };
};
