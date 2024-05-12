// Express
import { Request, Response } from "express";
// Models
import { Schedule } from "../models";

export const addSchedule = async (req: Request, res: Response) => {
    try {
        const { name, description, startDate, endDate, status, team, activities } = req.body;
        const comments = [];
        let initialDescription = "";
        if (description) {
            initialDescription = description;
        }
        const newSchedule = new Schedule({
            name,
            description: initialDescription,
            startDate,
            endDate,
            status,
            team,
            activities,    
        });
        await newSchedule.save();
        return res.status(200).json(newSchedule);
    } catch (error) {
        return res.status(500).json({ message: [error] });
    }
};