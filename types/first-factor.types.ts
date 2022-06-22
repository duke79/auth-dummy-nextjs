export interface RequestArgs {
  username: string;
  password: string;
}

export type ResponseData = {
  name?: string;
  isTwoFactorEnabled?: boolean;
  errorMessage?: string;
};

export type JWTData = {
  username: string;
  phone?: string;
};
