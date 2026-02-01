export type PetRequestDto = {
  nome: string;
  raca?: string;
  idade?: number;
};

export type PetResponseDto = {
  id: number;
  nome: string;
  raca?: string;
  idade?: number;
  foto?: {
    id: number;
    nome: string;
    contentType?: string;
    url?: string;
  };
};

import type { TutorResponseDto } from "./tutors";

export type PetResponseCompletoDto = PetResponseDto & {
  tutores?: TutorResponseDto[];
};

export type PagedPetResponseDto = {
  page: number;
  size: number;
  total: number;
  pageCount: number;
  content: PetResponseDto[];
};

export type PetWithTutorCount = PetResponseDto & {
  tutorCount: number;
};

export type PagedPetWithTutorCountDto = {
  page: number;
  size: number;
  total: number;
  pageCount: number;
  content: PetWithTutorCount[];
};

