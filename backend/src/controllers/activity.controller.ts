// Express
import { Request, Response } from "express";
// Models
import { Activity, Notification, Schedule } from "../models";
// Services
import { notificationObserver } from '../services';
import { dateVisitor } from '../services';

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
        const organizer = activities.filter((activity) => {
          // @ts-ignore
          return activity.organizers.some(
            // @ts-ignore
            (organizer) => organizer.toString() === userId.toString()
          );
        });
        const scheduled = schedules.flatMap((schedule) => {
          const studentTeams = schedule.teams.filter((team) => {
            // @ts-ignore
            return team.teachers.some(
              // @ts-ignore
              (student) => student.toString() === userId.toString()
            );
          });
          return studentTeams.length > 0 ? schedule.activities : [];
        });
        // @ts-ignore
        activities = [...organizer, ...scheduled];
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

//Notification configuration
export const createActivity = (req: Request, res: Response) => {
  const { sender, date, text } = req.body;
  const newNotification = new Notification(
      Date.now(), // using timestamp as a simple ID
      sender,
      new Date(date),
      text,
      'UNREAD'
  );

  notificationObserver.addNotification(newNotification);
  res.status(201).json({ message: 'Activity created and notification sent' });
};

export const getNotifications = (req: Request, res: Response) => {
  const { status } = req.query;
  const notifications = notificationObserver.getNotifications(status as 'READ' | 'UNREAD' | 'ALL');
  res.status(200).json(notifications);
};

export const deleteNotification = (req: Request, res: Response) => {
  const { id } = req.params;
  notificationObserver.deleteNotification(Number(id));
  res.status(200).json({ message: 'Notification deleted' });
};

export const updateActivityStatus = async (req: Request, res: Response) => {
  try {
      const { activityId } = req.params;
      await dateVisitor.visit(activityId);
      const updatedActivity = await Activity.findById(activityId);
      res.status(200).json({ message: 'Activity status updated', activity: updatedActivity });
  } catch (error:any) {
      res.status(404).json({ message: [error] });
  }
};