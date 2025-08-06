import type { IMedicine } from "./medicine.interface";

export interface IPrescription {
  id: string;
  medicine: IMedicine;
  timings: string[];
  quantity: number;
  obs?: string;
}
