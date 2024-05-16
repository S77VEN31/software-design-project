import { Request, Response } from "express";
import * as XLSX from "xlsx";
import { CampusBranch, StudentUser } from "../models"; // Asegúrate de que los modelos estén correctamente importados

interface Career {
  name: string;
}

interface Student {
  carne: string;
  name: string;
  email: string;
  career: Career[];
  campusBranch: string;
}

interface CampusBranch {
  name: string;
}

export const getStudentsExcel = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    console.log(`ID recibido: ${id}`);

    const workbook = XLSX.utils.book_new();

    if (id) {
      // Obtener estudiantes de un campus específico
      const students: Student[] = await StudentUser.find({ campusBranch: id })
        .populate("career")
        .populate("campusBranch");
      console.log(`Estudiantes encontrados: ${students.length}`);

      const campusBranch = await CampusBranch.findById(id);
      const name = campusBranch?.name || "Desconocido";

      const studentArray = students.map(({ carne, name, email, career }) => [
        carne,
        name,
        email,
        career.length ? career[0].name : "N/A",
      ]);

      const sheet = XLSX.utils.aoa_to_sheet([
        ["Carné", "Nombre", "Email", "Carrera"],
        ...studentArray,
      ]);
      XLSX.utils.book_append_sheet(workbook, sheet, name.slice(0, 31));
    } else {
      // Obtener todos los estudiantes y organizarlos por campus
      const campusBranches = await CampusBranch.find();
      console.log(`CampusBranches encontrados: ${campusBranches.length}`);

      for (const campus of campusBranches) {
        const students: Student[] = await StudentUser.find({
          campusBranch: campus._id,
        })
          .populate("career")
          .populate("campusBranch");
        console.log(
          `Estudiantes encontrados para el campus ${campus.name}: ${students.length}`
        );

        const studentArray = students.map(({ carne, name, email, career }) => [
          carne,
          name,
          email,
          career.length ? career[0].name : "N/A",
        ]);

        const sheet = XLSX.utils.aoa_to_sheet([
          ["Carné", "Nombre", "Email", "Carrera"],
          ...studentArray,
        ]);
        XLSX.utils.book_append_sheet(workbook, sheet, campus.name.slice(0, 31));
      }
    }

    const file = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="Estudiantes_${id ? id : "Todos"}.xlsx"`
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.status(200).send(file);
  } catch (error) {
    console.error("Error al generar el archivo Excel:", error); // Agrega esto para registrar el error en la consola
    res.status(500).json({ message: error }); // Asegúrate de devolver el mensaje de error correctamente
  }
};
