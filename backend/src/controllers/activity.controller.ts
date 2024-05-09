// Express
import { Request, Response } from "express";
// Mongoose
import { Document } from "mongoose";
// Models
import { Activity, TeacherUser } from "../models";

export const addActivity = async (req: Request, res: Response) => {
    try {
        const { 
            week,
            type, 
            name, 
            dateTime, 
            organizers, 
            announcementDays, 
            reminderDays, 
            mode, 
            meetingLink, 
            poster, 
            status, 
            evidence 
        } = req.body

        const organizersDocuments = organizers.reduce(async (accumulator: Array<Document>, idNumber: String, []) => {
            const coordinator = await TeacherUser.findOne({ idNumber });
            if (coordinator) {
                accumulator.push(coordinator);
                return;
            }
            // TBD: Error al no encontrar organizador?
        });
        const comments:Array<Document> = []

        const newActivity = new Activity({
            week,
            type, 
            name, 
            dateTime,
            organizers: organizersDocuments,
            announcementDays,
            reminderDays, 
            mode, 
            meetingLink, 
            poster, 
            status, 
            evidence,
            comments
        });
        await newActivity.save();
        return res.status(200).json(newActivity)
        
    } catch (error: any) {
        return res.status(500).json({ message: [error] });
    }
};

export const getActivities = async (req: Request, res: Response) => {
    try {        
        const activities = await Activity.find({})
            .populate({ path: "organizers", select: ["userName"]})
            .populate("comments")
            .populate({ path: "comments.author", select: ["userName"]});

        return res.status(200).json(activities);
    } catch (error: any) {
        return res.status(500).json({ message: [error] });
    }
};

export const getActivity = async (req: Request, res: Response) => {
    try {
        const { name } = req.params;
        
        const activities = await Activity.findOne({ name })
            .populate({ path: "organizers", select: ["userName, idNumber"]})
            .populate("comments")
            .populate({ path: "comments.author", select: ["userName"]})
            .populate("comments.replies")
            .populate({ path: "comments.replies.author", select: ["userName"]});

        return res.status(200).json(activities);
    } catch (error: any) {
        return res.status(500).json({ message: [error] });
    }
};

export const updateActivities = async (req: Request, res: Response) => {
    try {        
        const activityName = req.params.name;
        const { 
            week,
            type, 
            name, 
            dateTime, 
            organizers, 
            announcementDays, 
            reminderDays, 
            mode, 
            meetingLink, 
            poster, 
            status, 
            evidence 
        } = req.body

        const activity =  await Activity.findOne({ name: activityName });
        const organizersDocuments = organizers.reduce(async (accumulator: Array<Document>, idNumber: String, []) => {
            const coordinator = await TeacherUser.findOne({ idNumber });
            if (coordinator) {
                accumulator.push(coordinator);
                return;
            }
        });

        if (activity) {
            activity.week = week;
            activity.type = type;
            activity.name = name;
            activity.dateTime = dateTime;
            activity.organizers = organizersDocuments;
            activity.announcementDays = announcementDays;
            activity.reminderDays = reminderDays;
            activity.mode = mode;
            activity.meetingLink = meetingLink;
            activity.poster = poster;
            activity.status = status;
            activity.evidence = evidence;
            await activity.save();
            return res.status(200).json(activity)
        }

        const newActivity = new Activity({
            week,
            type, 
            name, 
            dateTime,
            organizers: organizersDocuments,
            announcementDays,
            reminderDays, 
            mode, 
            meetingLink, 
            poster, 
            status, 
            evidence,
            comments: []
        });
        await newActivity.save();
        return res.status(200).json(newActivity);

    } catch (error: any) {
        return res.status(500).json({ message: [error] });
    }
};

export const deleteActivity = async (req: Request, res: Response) => {
    try {
        const { name } = req.params;
        await Activity.deleteOne({ name });
        return res.status(200).json({ message: ["Deleted the activity successfully"]})
    } catch (error:any) {
        return res.status(500).json({ message: [error] });
    }
};