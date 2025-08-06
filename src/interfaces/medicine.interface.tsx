export interface IMedicine {
  id: number;
  name: string;
  dosage: string;
  formula: string;
  icon: MedicineFormulaEnum;
  accountable: boolean;
}

export enum MedicineFormulaEnum {
  CAPSULE = "capsule",
  COMPRESSED = "compressed",
  CREAM = "cream",
  DROPS = "drops",
  ELIXIR = "elixir",
  INHALER = "inhaler",
  PUMP = "pump",
  SACHET = "sachet",
  SHAMPOO = "shampoo",
  SPOON = "spoon",
  SPRAY = "spray",
  SUPPOSITORY = "suppository",
  INTIMUS = "intimus",
}
