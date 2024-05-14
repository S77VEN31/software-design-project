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
        return res
          .status(200)
          .json({
            message: ["Se creo correctamente el horario"],
            schedule: newSchedule,
          });
    } catch (error) {
        return res.status(500).json({ message: [error] });
    }
};

export const getSchedule = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const schedule = await Schedule
            .findById(id)
            .populate("activities")
            .populate("team")
            .populate("comments");

        return res.status(200).json(schedule);
    } catch (error) {
        return res.status(500).json({ message: [error] });
    }
}

export const getSchedules = async (req: Request, res: Response) => {
    try {
        const schedules = await Schedule
            .find({})
            .populate("activities")
            .populate("team")
            .populate("comments");
        return res.status(200).json(schedules);
    } catch (error) {
        return res.status(500).json({ message: [error] });
    }
};

export const updateSchedule = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { 
            name, 
            description, 
            startDate, 
            endDate, 
            status, 
            team, 
            activities, 
            comments 
        } = req.body;

        const schedule = await Schedule.findById(id);
        if (schedule) {
            schedule.name = name;
            schedule.description = description;
            schedule.startDate = startDate;
            schedule.endDate = endDate;
            schedule.status = status;
            schedule.team = team;
            schedule.activities = activities;
            schedule.comments = comments;
            await schedule.save();
            return res.status(200).json(schedule);
        }

        const newSchedule = new Schedule({
            name,
            description,
            startDate,
            endDate,
            status,
            team,
            activities,    
        });
        await newSchedule.save();
        return res.status(200).json(newSchedule)
    } catch (error) {
        return res.status(500).json({ message: [error] });
    }
};

export const deleteSchedule = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Schedule.findByIdAndDelete(id);
        return res
            .status(200)
            .json({ message: ["Deleted the schedule successfully"]});
    } catch (error) {
        return res.status(500).json({ message: [error] });
    }
};