import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Download, Pill, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { timings } from "./constants/timings.constant";
import type { IMedicine } from "./interfaces/medicine.interface";
import type { IPatientData } from "./interfaces/patient.interface";
import type { IPrescription } from "./interfaces/prescription.interface";
import { getMedicines } from "./lib/medicine.service";
import { gerarPDF } from "./lib/pdf-generator";

export default function ReceitaVisual() {
  const [search, setSearch] = useState("");
  const [prescriptionItems, setPrescriptionItems] = useState<IPrescription[]>(
    []
  );
  const [patientData, setPatientData] = useState<IPatientData>({
    name: "",
    age: "",
    obs: "",
  });
  const [medicines, setMedicines] = useState<IMedicine[]>([]);

  const fetchMedicines = async () => {
    const fetchedMedicines = await getMedicines();
    const medicines = fetchedMedicines.map(
      (med) =>
        ({
          ...med,
          accountable: med.accountable === "true",
        } as IMedicine)
    );
    setMedicines(medicines);
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const filteredMedicines = medicines.filter((med) =>
    med.name.toLowerCase().includes(search.toLowerCase())
  );

  const addItem = (medicine: IMedicine) => {
    const novoItem: IPrescription = {
      id: Date.now().toString(),
      medicine: medicine,
      timings: [],
      quantity: 1,
    };
    setPrescriptionItems([...prescriptionItems, novoItem]);
  };

  const updateItem = (id: string, field: string, value: string | number) => {
    setPrescriptionItems((items) =>
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeItem = (id: string) => {
    setPrescriptionItems((itens) => itens.filter((item) => item.id !== id));
  };

  const toggleTiming = (itemId: string, time: string) => {
    setPrescriptionItems((items) =>
      items.map((item) => {
        if (item.id === itemId) {
          const timings = item.timings.includes(time)
            ? item.timings.filter((h) => h !== time)
            : [...item.timings, time];
          return { ...item, timings };
        }
        return item;
      })
    );
  };

  const handleGeneratePDF = async () => {
    if (prescriptionItems.length === 0) {
      alert("Adicione pelo menos um medicamento à receita");
      return;
    }

    await gerarPDF({ patientData, prescriptionItems });
  };

  useEffect(() => {
    console.log("✌️prescriptionItems --->", prescriptionItems);
  }, [prescriptionItems]);

  return (
    <div className="w-full min-h-screen min-w-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-4 sm:p-2">
      <div className="w-full max-w-6xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-800">
            Descomplica Receita
          </h1>
          <p className="text-gray-600">
            Sistema para gerar receitas visuais para pacientes analfabetos
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:w-full mx-auto">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5" />
                  Dados do Paciente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nonameme">Nome do Paciente</Label>
                  <Input
                    id="name"
                    value={patientData.name}
                    onChange={(e) =>
                      setPatientData({
                        ...patientData,
                        name: e.target.value,
                      })
                    }
                    placeholder="Nome completo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Idade</Label>
                  <Input
                    id="age"
                    value={patientData.age}
                    onChange={(e) =>
                      setPatientData({
                        ...patientData,
                        age: e.target.value,
                      })
                    }
                    placeholder="Idade do paciente"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="obs">Observações Gerais</Label>
                  <Textarea
                    id="obs"
                    value={patientData.obs}
                    onChange={(e) =>
                      setPatientData({
                        ...patientData,
                        obs: e.target.value,
                      })
                    }
                    placeholder="Observações importantes sobre o tratamento"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Buscar Medicamentos
                </CardTitle>
                <CardDescription>
                  Busque por nome do medicamento ou princípio ativo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    className="pl-10"
                    placeholder="Digite o nome do medicamento..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <div className="mt-4 h-60 overflow-y-auto space-y-2">
                  {filteredMedicines.map((med) => (
                    <div
                      key={med.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-medium">{med.name}</p>
                          <Badge variant="outline" className="text-xs">
                            {med.dosage}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => addItem(med)}
                        className="flex items-center gap-1 bg-neutral-950"
                      >
                        <Plus className="h-4 w-4" />
                        Adicionar
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Receita Visual
                </CardTitle>
                <CardDescription>
                  Configure horários e quantidades para cada medicamento
                </CardDescription>
              </div>
              <Button
                onClick={handleGeneratePDF}
                disabled={prescriptionItems.length === 0}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Gerar PDF
              </Button>
            </CardHeader>
            <CardContent className="h-full flex items-center justify-center">
              {prescriptionItems.length === 0 ? (
                <div className="text-center text-gray-500">
                  <Pill className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhum medicamento adicionado</p>
                  <p className="text-sm">
                    Busque e adicione medicamentos para criar a receita
                  </p>
                </div>
              ) : (
                <div className="space-y-6 max-h-160 overflow-y-auto">
                  {prescriptionItems.map((item) => (
                    <div
                      key={item.id}
                      className="border rounded-lg p-4 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div>
                            <h3 className="font-medium">
                              {item.medicine.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {item.medicine.dosage}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Horários</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {timings.map((timing) => (
                            <Button
                              key={timing.id}
                              variant={
                                item.timings.includes(timing.id)
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() => toggleTiming(item.id, timing.id)}
                              className="flex items-center gap-1"
                            >
                              <span>{timing.icon}</span>
                              {timing.name}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {item.medicine.accountable && (
                          <div>
                            <Label className="text-sm font-medium">
                              Quantidade
                            </Label>
                            <Select
                              value={item.quantity.toString()}
                              onValueChange={(value) => {
                                console.log("✌️value --->", value);
                                updateItem(
                                  item.id,
                                  "quantity",
                                  Number.parseInt(value)
                                );
                              }}
                            >
                              <SelectTrigger className="cursor-pointer">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from(
                                  { length: 20 },
                                  (_, i) => i + 1
                                ).map((num) => (
                                  <SelectItem
                                    key={num}
                                    value={num.toString()}
                                    className="cursor-pointer"
                                  >
                                    {num} {item.medicine.formula}
                                    {num > 1 ? "s" : ""}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>

                      <div>
                        <Label className="text-sm font-medium">
                          Observações
                        </Label>
                        <Textarea
                          placeholder="Observações específicas para este medicamento"
                          value={item.obs || ""}
                          onChange={(e) =>
                            updateItem(item.id, "obs", e.target.value)
                          }
                          className="mt-1"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="fixed bottom-4 right-4 text-gray-600 text-sm">
        <p>
          Desenvolvido com ❤️ por{" "}
          <a
            href="https://github.com/danielsimass"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Daniel Simas
          </a>
        </p>
      </div>
    </div>
  );
}
