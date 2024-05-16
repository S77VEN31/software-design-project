// Express
import { Request, Response } from "express";
// XLSX
import * as XLSX from 'xlsx';
// Models
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

    const students: Student[] = id
      ? await StudentUser.find({ campusBranch: id })
          .populate("career")
          .populate("campusBranch")
      : await StudentUser.find().populate("career").populate("campusBranch");

    const campusBranch = id ? await CampusBranch.findById(id) : null;
    const name = campusBranch?.name || "Todos";

    const workbook = XLSX.utils.book_new();

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
    XLSX.utils.book_append_sheet(workbook, sheet, "Estudiantes");

    const file = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="Estudiantes_${name}.xlsx"`
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