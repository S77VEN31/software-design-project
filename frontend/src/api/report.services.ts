// Api
import { api } from "@api";
// Enviroment variables
const { VITE_API_REPORT } = import.meta.env;

export const downloadExcel = async (id?: string) => {
  const url = id ? `${VITE_API_REPORT}?id=${id}` : `${VITE_API_REPORT}`;

  try {
    const response = await api.get(url, {
      responseType: "blob", // Especificamos que el tipo de respuesta es un blob
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });

    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = downloadUrl;
    a.download = `Estudiantes_${id || "Todos"}.xlsx`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error("There was an error!", error);
  }
};
