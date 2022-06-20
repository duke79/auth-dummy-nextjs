export interface RequestArgs {
}

export type ResponseData = {
  username: string;
  phone: string;
  roles: string[];
} | {
  errorMessage?: string;
};
