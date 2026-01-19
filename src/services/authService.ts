import { api } from "./api";
import { AuthRequestDto, AuthResponseDto } from "../types/auth";

export const authService = {
  async login(payload: AuthRequestDto): Promise<AuthResponseDto> {
    if (!payload.username || !payload.password) {
      throw new Error("Informe usuário e senha para entrar.");
    }
    const response = await api.post<AuthResponseDto>("/autenticacao/login", payload);
    return response.data;
  },

  async refresh(refreshToken: string): Promise<AuthResponseDto> {
    const response = await api.put<AuthResponseDto>("/autenticacao/refresh", null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    return response.data;
  },
};
