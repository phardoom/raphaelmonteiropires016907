import { api } from "./api";
import {
  PetRequestDto,
  PetResponseDto,
  PetResponseCompletoDto,
  PagedPetResponseDto,
} from "../types/pets";

export type PetsListParams = {
  nome?: string;
  raca?: string;
  page?: number;
  size?: number;
};

export const petsService = {
  async list(params?: PetsListParams): Promise<PagedPetResponseDto> {
    const response = await api.get<PagedPetResponseDto>("/v1/pets", {
      params,
    });
    return response.data;
  },

  async getById(id: number): Promise<PetResponseCompletoDto> {
    const response = await api.get<PetResponseCompletoDto>(`/v1/pets/${id}`);
    return response.data;
  },

  async create(payload: PetRequestDto): Promise<PetResponseDto> {
    if (!payload.nome) {
      throw new Error("O nome do pet é obrigatório.");
    }
    const response = await api.post<PetResponseDto>("/v1/pets", payload);
    return response.data;
  },

  async update(id: number, payload: PetRequestDto): Promise<PetResponseDto> {
    if (!payload.nome) {
      throw new Error("O nome do pet é obrigatório.");
    }
    const response = await api.put<PetResponseDto>(`/v1/pets/${id}`, payload);
    return response.data;
  },

  async remove(id: number): Promise<void> {
    await api.delete(`/v1/pets/${id}`);
  },

  async uploadPhoto(id: number, file: File): Promise<void> {
    const formData = new FormData();
    formData.append("foto", file);
    await api.post(`/v1/pets/${id}/fotos`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
