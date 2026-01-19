export type AuthRequestDto = {
  username: string;
  password: string;
};

export type AuthResponseDto = {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  refresh_expires_in?: number;
};
