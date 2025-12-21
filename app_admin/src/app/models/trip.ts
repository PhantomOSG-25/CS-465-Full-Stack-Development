export interface Trip {
  _id?: string;
  code: string;
  name: string;
  length: string;
  start: string;
  resort: string;
  perPerson: number | string;
  image: string;
  description: string;
}
