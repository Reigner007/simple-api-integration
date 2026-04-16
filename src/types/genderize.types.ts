export interface GenderizeResponse {
  name: string;
  gender: string | null;
  probability: number;
  count: number;
}