import { timings } from "@/constants/timings.constant";
import type { IPatientData } from "@/interfaces/patient.interface";
import type { IPrescription } from "@/interfaces/prescription.interface";
import { getMedicineIconByType } from "@/utils/get-medicine-icon-by-type.util";
import { getTimingIcon } from "@/utils/get-timing-icon.util";

export const gerarPDF = async ({
  patientData,
  prescriptionItems,
}: {
  patientData: IPatientData;
  prescriptionItems: IPrescription[];
}) => {
  const medicineByTiming = new Map<string, IPrescription[]>();

  timings.forEach((timing) => {
    medicineByTiming.set(timing.id, []);
  });

  prescriptionItems.forEach((item) => {
    item.timings.forEach((timingId) => {
      if (medicineByTiming.has(timingId)) {
        medicineByTiming.get(timingId)?.push(item);
      }
    });
  });

  const conteudoHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Descomplica Receita - ${patientData?.name}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background: white;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #333;
            padding-bottom: 20px;
          }
          .header h1 {
            font-size: 48px;
            margin: 0;
            font-weight: bold;
          }
          .patient-info {
            margin-bottom: 30px;
            padding: 15px;
            background: #f5f5f5;
            border-radius: 8px;
          }
          .receita-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
          }
          .receita-table th {
            background: transparent;
            padding: 15px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            border: 2px solid #333;
          }
          .receita-table td {
            padding: 0;
            text-align: center;
            border: 2px solid #333;
            vertical-align: middle;
          }         
          .receita-table tr {
            height: 120px;
          }
          .receita-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
            page-break-inside: auto; /* Permite que a tabela seja dividida entre páginas */
          }

          .receita-table tr {
            page-break-inside: avoid; /* Evita que uma linha da tabela seja quebrada no meio */
            page-break-after: auto;
          }

          .receita-table thead {
            display: table-header-group; /* Garante que o cabeçalho seja tratado como um grupo */
          }

          .receita-table tbody {
            display: table-row-group; /* Garante que o corpo seja tratado como um grupo */
          }

          .receita-table th, .receita-table td {
            border: 2px solid #333;
            padding: 15px;
            text-align: center;
            vertical-align: middle;
          }
          .horario-cell {
            width: 20%;
            padding: 0;
          }
          .horario-cell img {
            display: block;
            margin: auto;
            margin-bottom: 5px;
          }
          .medicamento-cell {
            width: 50%;
            padding: 0;
          }
          .quantidade-cell {
            width: 30%;
            padding: 0;
          }
          .horario-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
          }
          .horario-icon {
            font-size: 48px;
            margin-bottom: 5px;
          }
          .horario-text {
            font-size: 18px;
            font-weight: bold;
          }
          .medicamento-linha {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 15px;
            border-bottom: 1px solid #ddd;
            min-height: 80px;
          }
          .medicamento-linha:last-child {
            border-bottom: none;
          }
          .quantidade-linha {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 15px;
            border-bottom: 1px solid #ddd;
            min-height: 80px;
          }
          .quantidade-linha:last-child {
            border-bottom: none;
          }
          .medicamento-info {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;
          }
          .medicamento-nome {
            font-size: 16px;
            font-weight: bold;
            text-align: center;
          }
          .medicamento-dosagem {
            font-size: 12px;
            color: #666;
          }
          .medicamento-obs {
            font-size: 10px;
            color: #888;
            font-style: italic;
            text-align: center;
            margin-top: 5px;
          }
          .quantidade-pills {
            display: flex;
            gap: 8px;
            justify-content: center;
            flex-wrap: wrap;
          }
          .pill {
            width: 35px;
            height: 35px;
            background: #ddd;
            border-radius: 50%;
            border: 2px solid #999;
          }
          .observacoes {
            margin-top: 20px;
            padding: 15px;
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
          }
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
            .receita-table thead {
              display: table-row-group;
            };
            .receita-table thead tr:not(:first-child) {
              display: none;
            };
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>DESCOMPLICA RECEITA</h1>
        </div>
        
        <div class="patient-info">
          <h2>Paciente: ${patientData.name}</h2>
          ${
            patientData.age
              ? `<p><strong>Idade:</strong> ${patientData.age} anos</p>`
              : ""
          }
          <p><strong>Data:</strong> ${new Date().toLocaleDateString(
            "pt-BR"
          )}</p>
        </div>
  
        <table class="receita-table">
          <thead>
            <tr>
              <th class="horario-cell">HORÁRIO</th>
              <th class="medicamento-cell">REMÉDIO</th>
              <th class="quantidade-cell">QUANTIDADE</th>
            </tr>
          </thead>
          <tbody>
            ${timings
              .map((time) => {
                const prescriptionItems = medicineByTiming.get(time.id) || [];
                const icon = getTimingIcon(time.id);
                return `
                <tr>
                  <td class="horario-cell" rowspan="1">
                    <div class="horario-content">
                      <img src="${icon}" style="display:block; height:80px; margin:auto;"/>
                    </div>
                  </td>
                  <td class="medicamento-cell">
                    ${prescriptionItems
                      .map(
                        (item) => `
                      <div class="medicamento-linha">
                        <div class="medicamento-info">
                          <div class="medicamento-nome">${item?.medicine?.name.toUpperCase()}</div>
                          <div class="medicamento-dosagem">${
                            item?.medicine?.dosage
                          }</div>
                          ${
                            item?.obs
                              ? `<div class="medicamento-obs">${item.obs}</div>`
                              : ""
                          }
                        </div>
                      </div>
                    `
                      )
                      .join("")}
                  </td>
                  <td class="quantidade-cell">
                    ${prescriptionItems
                      .map((item) => {
                        const icon = getMedicineIconByType(item.medicine.icon);
                        return `
                      <div class="quantidade-linha">
                        <div class="quantidade-pills">
                          ${Array.from(
                            { length: item?.quantity },
                            () => `<img src="${icon}" style="height: 32px;" />`
                          ).join("")}
                        </div>
                      </div>
                    `;
                      })
                      .join("")}
                  </td>
                </tr>
              `;
              })
              .join("")}
          </tbody>
        </table>
  
        ${
          patientData.obs
            ? `
          <div class="observacoes">
            <h3>Observações Importantes:</h3>
            <p>${patientData.obs}</p>
          </div>
        `
            : ""
        }
  
        <div style="margin-top: 40px; text-align: center; font-size: 12px; color: #666;">
          <p>Receita gerada pelo Sistema de Receita Visual</p>
          <p>Data de geração: ${new Date().toLocaleString("pt-BR")}</p>
        </div>
      </body>
      </html>
    `;

  // Criar um blob com o HTML e abrir em nova janela para impressão/download
  const blob = new Blob([conteudoHTML], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const newWindow = window.open(url, "_blank");

  if (newWindow) {
    newWindow.onload = () => {
      setTimeout(() => {
        newWindow.print();
      }, 500);
    };
  }

  // Cleanup
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
};
