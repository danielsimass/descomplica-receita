import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MedicineFormulaEnum,
  type IMedicine,
} from "@/interfaces/medicine.interface";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

interface AddMedicineModalProps {
  onAddMedicine: (medicine: IMedicine) => void;
  nextId: number;
}

const iconOptions = [
  { value: MedicineFormulaEnum.CAPSULE, label: "Cápsula" },
  { value: MedicineFormulaEnum.COMPRESSED, label: "Comprimido" },
  { value: MedicineFormulaEnum.CREAM, label: "Creme/Pomada/Gel" },
  { value: MedicineFormulaEnum.DROPS, label: "Gotas" },
  { value: MedicineFormulaEnum.ELIXIR, label: "Xarope/Solução/Suspensão" },
  { value: MedicineFormulaEnum.INHALER, label: "Inalador/Spray Nasal" },
  { value: MedicineFormulaEnum.PUMP, label: "Bomba/Nebulizador" },
  { value: MedicineFormulaEnum.SACHET, label: "Sachê/Pó" },
  { value: MedicineFormulaEnum.SHAMPOO, label: "Xampu" },
  { value: MedicineFormulaEnum.SPOON, label: "Colher/Óleo" },
  { value: MedicineFormulaEnum.SPRAY, label: "Spray/Aerossol" },
  { value: MedicineFormulaEnum.SUPPOSITORY, label: "Supositório" },
  { value: MedicineFormulaEnum.INTIMUS, label: "Gel Vaginal" },
];

const formulaOptions = [
  "Cápsula",
  "Comprimido",
  "Creme",
  "Creme vaginal",
  "Gel oral",
  "Loção",
  "Pasta",
  "Pomada oftálmica",
  "Elixir",
  "Solução oral",
  "Suspensão oral",
  "Xarope",
  "Solução nasal",
  "Suspensão para inalação nasal",
  "Solução inalante",
  "Pó para solução oral",
  "Pó para suspensão oral",
  "Xampu",
  "Colher",
  "Aerossol",
  "Supositório",
  "Gel vaginal",
];

export default function AddMedicineModal({
  onAddMedicine,
  nextId,
}: AddMedicineModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    formula: "Comprimido",
    icon: MedicineFormulaEnum.COMPRESSED,
    accountable: false,
    obs: "",
  });

  useEffect(() => {
    setFormData({
      name: "",
      dosage: "",
      formula: "Comprimido",
      icon: MedicineFormulaEnum.COMPRESSED,
      accountable: false,
      obs: "",
    });
  }, []);

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.dosage.trim()) {
      alert("Nome e dosagem são obrigatórios");
      return;
    }

    const newMedicine: IMedicine = {
      id: nextId,
      name: formData.name.trim(),
      dosage: formData.dosage.trim(),
      formula: formData.formula,
      icon: formData.icon,
      accountable: formData.accountable,
    };

    onAddMedicine(newMedicine);

    setFormData({
      name: "",
      dosage: "",
      formula: "Comprimido",
      icon: MedicineFormulaEnum.COMPRESSED,
      accountable: false,
      obs: "",
    });

    setOpen(false);
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      dosage: "",
      formula: "Comprimido",
      icon: MedicineFormulaEnum.COMPRESSED,
      accountable: false,
      obs: "",
    });
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="default" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Adicionar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-100wv">
        <AlertDialogHeader>
          <AlertDialogTitle>Adicionar Novo Medicamento</AlertDialogTitle>
          <AlertDialogDescription>
            Preencha os dados do medicamento para adicioná-lo à lista
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="medicine-name">Nome do Medicamento *</Label>
            <Input
              id="medicine-name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Ex: Paracetamol"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="medicine-dosage">Dosagem *</Label>
            <Input
              id="medicine-dosage"
              value={formData.dosage}
              onChange={(e) =>
                setFormData({ ...formData, dosage: e.target.value })
              }
              placeholder="Ex: 500 mg"
              className="w-full"
            />
          </div>

          <div className="flex justify-between gap-4">
            <div className="space-y-2">
              <Label htmlFor="medicine-formula">Forma Farmacêutica</Label>
              <Select
                value={formData.formula}
                onValueChange={(value) =>
                  setFormData({ ...formData, formula: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-y-auto">
                  {formulaOptions.map((formula) => (
                    <SelectItem key={formula} value={formula}>
                      {formula}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="medicine-icon">Ícone Visual</Label>
              <Select
                value={formData.icon}
                onValueChange={(value: MedicineFormulaEnum) =>
                  setFormData({ ...formData, icon: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((icon) => (
                    <SelectItem key={icon.value} value={icon.value}>
                      {icon.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer" onClick={handleCancel}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction className="cursor-pointer" onClick={handleSubmit}>
            Adicionar Medicamento
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
