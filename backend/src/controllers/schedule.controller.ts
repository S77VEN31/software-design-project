// Express
import { Request, Response } from "express";
// Models
import { Schedule } from "../models";

export const addSchedule = async (req: Request, res: Response) => {
  try {
    const scheduleData = req.body;
    const newSchedule = await new Schedule({ ...scheduleData }).save();
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
    const { id } = req.query;
    const schedule = await Schedule.findById(id).populate("comments");
    return res.status(200).json(schedule);
  } catch (error) {
    return res.status(500).json({ message: [error] });
  }
};

export const getSchedules = async (req: Request, res: Response) => {
  try {
    const { userId, roles } = req.query;

    if (!userId || !roles) {
      return res.status(400).json({
        message: ["Se requiere el id del usuario y los roles"],
      });
    }
    const populateString = "activities teams comments";
    let schedules = await Schedule.find({}).populate(populateString);

    switch (roles) {
      case "Student":
        const filteredSchedules = schedules.filter((schedule) => {
          return schedule.teams.some((team) => {
            // @ts-ignore
            return team.students.some(
              // @ts-ignore
              (student) => student.toString() === userId.toString()
            );
          });
        });
        schedules = filteredSchedules;
        break;
      case "Teacher":
        const filteredSchedulesTeacher = schedules.filter((schedule) => {
          return schedule.teams.some((team) => {
            // @ts-ignore
            return team.teachers.toString() === userId.toString();
          });
        });
        schedules = filteredSchedulesTeacher;
        break;
      case "Coordinator":
        const filteredSchedulesCoordinator = schedules.filter((schedule) => {
          return schedule.teams.some((team) => {
            // @ts-ignore
            return team.coordinator.toString() === userId.toString();
          });
        });
        schedules = filteredSchedulesCoordinator;
        break;
      default:
        break;
    }
    return res.status(200).json(schedules);
  } catch (error) {
    return res.status(500).json({ message: [error] });
  }
};

export const updateSchedule = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
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
    const { id } = req.query;
    const deletedSchedule = await Schedule.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: ["Horario eliminado correctamente"], deletedSchedule });
  } catch (error) {
    return res.status(500).json({ message: [error] });
  }
};