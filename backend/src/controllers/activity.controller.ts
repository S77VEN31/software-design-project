// Express
import { Request, Response } from "express";
// Mongoose
// Models
import { Activity, Schedule } from "../models";

export const addActivity = async (req: Request, res: Response) => {
  try {
    const activityData = req.body;
    const newActivity = await new Activity({
      ...activityData,
      comments: [],
    }).save();
    return res.status(200).json({
      message: ["Actividad creada correctamente"],
      activity: newActivity,
    });
  } catch (error: any) {
    return res.status(500).json({ message: [error] });
  }
};

export const getActivities = async (req: Request, res: Response) => {
  try {
    const { userId, roles } = req.query;

    if (!userId || !roles) {
      return res.status(400).json({
        message: ["Se requiere el id del usuario y los roles"],
      });
    }

    const populateScheduleString = "activities teams";
    let activities = await Activity.find({});
    let schedules = await Schedule.find({}).populate(populateScheduleString);
    switch (roles) {
      case "Student":
        // @ts-ignore
        activities = schedules.flatMap((schedule) => {
          const studentTeams = schedule.teams.filter((team) => {
            // @ts-ignore
            return team.students.some(
              // @ts-ignore
              (student) => student.toString() === userId.toString()
            );
          });
          return studentTeams.length > 0 ? schedule.activities : [];
        });
        break;
      case "Teacher":
        activities = activities.filter((activity) => {
          // @ts-ignore
          return activity.organizers.some(
            // @ts-ignore
            (organizer) => organizer.toString() === userId.toString()
          );
        });
        break;
    }
    return res.status(200).json(activities);
  } catch (error: any) {
    return res.status(500).json({ message: [error] });
  }
};

export const getActivity = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const activity = await Activity.findById(id);
    return res.status(200).json(activity);
  } catch (error: any) {
    return res.status(500).json({ message: [error] });
  }
};

export const updateActivities = async (req: Request, res: Response) => {
    try {        
        const { id } = req.query;
        const updatedActivityData = req.body;
        const updatedActivity = await Activity.findByIdAndUpdate(
            { _id: id },
            updatedActivityData,
            { new: true }
        );
        return res.status(200).json({
            message: ["Actividad actualizada correctamente"],
            activity: updatedActivity,
        });
    } catch (error: any) {
        return res.status(500).json({ message: [error] });
    }
};

export const deleteActivity = async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      const deletedActivity = await Activity.findByIdAndDelete(id);
      return res.status(200).json({
        message: ["Actividad eliminada correctamente"],
        deletedActivity,
      });
    } catch (error:any) {
        return res.status(500).json({ message: [error] });
    }
};