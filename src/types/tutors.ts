export type TutorRequestDto = {
  nome: string;
  telefone: string;
  endereco: string;
};

export type TutorResponseDto = {
  id: number;
  nome: string;
  email?: string;
  telefone?: string;
  endereco?: string;
  cpf?: number;
  foto?: {
    id: number;
    nome: string;
    contentType?: string;
    url?: string;
  };
};

export type TutorResponseComPetsDto = TutorResponseDto & {
  pets?: Array<{
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
  }>;
};

export type PagedTutorResponseDto = {
  page: number;
  size: number;
  total: number;
  pageCount: number;
  content: TutorResponseDto[];
};

export type TutorWithPetCount = TutorResponseDto & {
  petCount: number;
};

export type PagedTutorWithPetCountDto = {
  page: number;
  size: number;
  total: number;
  pageCount: number;
  content: TutorWithPetCount[];
};
