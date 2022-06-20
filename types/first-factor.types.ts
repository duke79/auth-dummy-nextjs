export interface RequestArgs {
  username: string;
  password: string;
}

export type ResponseData = {
  name: string;
} | {
  errorMessage?: string;
};

export type JWTData = {
  username: string;
};
