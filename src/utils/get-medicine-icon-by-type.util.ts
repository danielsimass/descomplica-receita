import capsule from "@/assets/medicine/capsule.svg";
import compressed from "@/assets/medicine/compressed.svg";
import cream from "@/assets/medicine/cream.svg";
import drops from "@/assets/medicine/drops.svg";
import elixir from "@/assets/medicine/elixir.svg";
import inhaler from "@/assets/medicine/inhaler.svg";
import intimus from "@/assets/medicine/intimus.svg";
import pump from "@/assets/medicine/pump.svg";
import sachet from "@/assets/medicine/sachet.svg";
import shampoo from "@/assets/medicine/shampoo.svg";
import spoon from "@/assets/medicine/spoon.svg";
import spray from "@/assets/medicine/spray.svg";
import suppository from "@/assets/medicine/suppository.svg";
import { MedicineFormulaEnum } from "@/interfaces/medicine.interface";

export const getMedicineIconByType = (type: MedicineFormulaEnum) => {
  switch (type) {
    case MedicineFormulaEnum.CAPSULE:
      return capsule;
    case MedicineFormulaEnum.COMPRESSED:
      return compressed;
    case MedicineFormulaEnum.CREAM:
      return cream;
    case MedicineFormulaEnum.DROPS:
      return drops;
    case MedicineFormulaEnum.ELIXIR:
      return elixir;
    case MedicineFormulaEnum.INHALER:
      return inhaler;
    case MedicineFormulaEnum.PUMP:
      return pump;
    case MedicineFormulaEnum.SACHET:
      return sachet;
    case MedicineFormulaEnum.SHAMPOO:
      return shampoo;
    case MedicineFormulaEnum.SPOON:
      return spoon;
    case MedicineFormulaEnum.SPRAY:
      return spray;
    case MedicineFormulaEnum.SUPPOSITORY:
      return suppository;
    case MedicineFormulaEnum.INTIMUS:
      return intimus;
  }
};
