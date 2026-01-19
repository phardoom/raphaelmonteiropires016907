import { api } from "./api";
import {
  PagedTutorResponseDto,
  TutorRequestDto,
  TutorResponseComPetsDto,
  TutorResponseDto,
} from "../types/tutors";

export type TutorsListParams = {
  nome?: string;
  page?: number;
  size?: number;
};

export const tutorsService = {
  async list(params?: TutorsListParams): Promise<PagedTutorResponseDto> {
    const response = await api.get<PagedTutorResponseDto>("/v1/tutores", {
      params,
    });
    return response.data;
  },

  async getById(id: number): Promise<TutorResponseComPetsDto> {
    const response = await api.get<TutorResponseComPetsDto>(`/v1/tutores/${id}`);
    return response.data;
  },

  async create(payload: TutorRequestDto): Promise<TutorResponseDto> {
    if (!payload.nome || !payload.telefone) {
      throw new Error("Nome e telefone são obrigatórios.");
    }
    const response = await api.post<TutorResponseDto>("/v1/tutores", payload);
    return response.data;
  },

  async update(id: number, payload: TutorRequestDto): Promise<TutorResponseDto> {
    if (!payload.nome || !payload.telefone) {
      throw new Error("Nome e telefone são obrigatórios.");
    }
    const response = await api.put<TutorResponseDto>(`/v1/tutores/${id}`, payload);
    return response.data;
  },

  async remove(id: number): Promise<void> {
    await api.delete(`/v1/tutores/${id}`);
  },

  async uploadPhoto(id: number, file: File): Promise<void> {
    const formData = new FormData();
    formData.append("foto", file);
    await api.post(`/v1/tutores/${id}/fotos`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  async linkPet(tutorId: number, petId: number): Promise<void> {
    await api.post(`/v1/tutores/${tutorId}/pets/${petId}`);
  },

  async unlinkPet(tutorId: number, petId: number): Promise<void> {
    await api.delete(`/v1/tutores/${tutorId}/pets/${petId}`);
  },
};
