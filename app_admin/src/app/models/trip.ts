export interface Trip {
  _id?: string;          // MongoDB ID
  name: string;
  code: string;
  length: string;
  start: string;         // ISO date string (yyyy-mm-dd)
  resort: string;
  perPerson: number;
  image: string;
  description: string;
}
