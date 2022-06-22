export interface RequestArgs {
  otp: string;
}

export type ResponseData = {
  name: string;
} | {
  errorMessage?: string;
};
