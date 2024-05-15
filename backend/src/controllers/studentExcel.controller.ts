// Express
import { Request, Response } from "express";
// XLSX
import * as XLSX from 'xlsx';
// Models
import { StudentUser, CampusBranch } from "../models";

export const getAllStudentsExcel = async (req: Request, res: Response) => {
    try {
        const students:any[] = await StudentUser
            .find({})
            .populate("career");
        const campusBranches:any[] = await CampusBranch.find({});
        const workbook = XLSX.utils.book_new();
        campusBranches.forEach((campus) => {
            const studentArray = students
                .filter(student => student.campusBranch && student.campusBranch.includes(campus._id))
                .map(
                    student => [
                        student.carne,
                        student.name,
                        student.email,
                        student.career.lenght > 0 ? student.career[0].name : "N/A",
                    ]
                );
            const sheet = XLSX.utils.aoa_to_sheet(studentArray);
            XLSX.utils.book_append_sheet(workbook, sheet, campus.initials);
        });


        const file = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
          // Set response headers
        res.setHeader('Content-Disposition', 'attachment; filename="Estudiantes_Todas_Sedes.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        return res.status(200).send(file);
    } catch (error) {
        return res.status(500).json({ message: [error] });
    }
};

export const getStudentsExcel = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const students:any[] = await StudentUser
            .find({campusBranch: { $in: [id] }})
            .populate("career")
            .populate("campusBranch");
        const campusBranch = await CampusBranch.findById(id);
        const name = (campusBranch && campusBranch.name ? campusBranch.name : "");
        const workbook = XLSX.utils.book_new();

        const studentArray = students
        .map(
            student => [
                student.carne,
                student.name,
                student.email,
                student.career.lenght > 0 ? student.career[0].name : "N/A",
            ]
        );
        const sheet = XLSX.utils.aoa_to_sheet(studentArray);
        XLSX.utils.book_append_sheet(workbook, sheet, "Estudiantes");

        const file = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
          // Set response headers
        res.setHeader('Content-Disposition', `attachment; filename="Estudiantes_${name}.xlsx"`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        return res.status(200).send(file);

    } catch (error) {
        return res.status(500).json({ message: [error] });
    }
};