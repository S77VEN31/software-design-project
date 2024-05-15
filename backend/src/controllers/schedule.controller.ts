// Express
import { Request, Response } from "express";
// Models
import { Schedule } from "../models";

export const addSchedule = async (req: Request, res: Response) => {
  try {
    const { name, description, startDate, endDate, status, teams, activities } =
      req.body;
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
      teams,
      activities,
    });
    await newSchedule.save();
    return res.status(200).json({
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
    const schedule = await Schedule.findById(id)
      .populate("activities")
      .populate("comments");
    return res.status(200).json(schedule);
  } catch (error) {
    return res.status(500).json({ message: [error] });
  }
};

export const getSchedules = async (req: Request, res: Response) => {
  try {
    const schedules = await Schedule.find({})
      .populate("activities")
      .populate("teams")
      .populate("comments");
    return res.status(200).json(schedules);
  } catch (error) {
    return res.status(500).json({ message: [error] });
  }
};

export const updateSchedule = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedScheduleData = req.body;
    const updatedSchedule = await Schedule.findByIdAndUpdate(
      { _id: id },
      updatedScheduleData,
      { new: true }
    );
    return res.status(200).json({
      message: ["Horario actualizado correctamente"],
      schedule: updatedSchedule,
    });
  } catch (error) {
    return res.status(500).json({ message: [error] });
  }
};

export const deleteSchedule = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedSchedule = await Schedule.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: ["Horario eliminado correctamente"], deletedSchedule });
  } catch (error) {
    return res.status(500).json({ message: [error] });
  }
};