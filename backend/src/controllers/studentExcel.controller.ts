// Express
import { Request, Response } from "express";
// XLSX
import * as XLSX from "xlsx";
// Moongoose
import { CampusBranch, StudentUser } from "../models";

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

    const workbook = XLSX.utils.book_new();

    if (id) {
      // Obtener estudiantes de un campus específico
      const students: Student[] = await StudentUser.find({ campusBranch: id })
        .populate("career")
        .populate("campusBranch");

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
      XLSX.utils.book_append_sheet(workbook, sheet, name);
    } else {
      // Obtener todos los estudiantes y organizarlos por campus
      const campusBranches = await CampusBranch.find();

      for (const campus of campusBranches) {
        const students: Student[] = await StudentUser.find({
          campusBranch: campus._id,
        })
          .populate("career")
          .populate("campusBranch");

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
        XLSX.utils.book_append_sheet(workbook, sheet, campus.name);
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
    res.status(500).json({ message: [error] });
  }
};
