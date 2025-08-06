/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IMedicine } from "@/interfaces/medicine.interface";
import Papa from "papaparse";

type MedicineResponse = Omit<IMedicine, "accountable"> & {
  accountable: string;
};
export const getMedicines = async (): Promise<MedicineResponse[]> => {
  const response = await fetch("/data/medicines.csv");
  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results: any) => {
        resolve(results.data);
      },
      error: (err: any) => reject(err),
    });
  });
};
