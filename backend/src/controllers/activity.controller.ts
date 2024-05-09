// Express
import { Request, Response } from "express";
// Mongoose
import { Document } from "mongoose";
// Models
import { Activity, AdminAssistantUser } from "../models";

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
        const organizersDocuments = organizers.reduce(async (organizerName: String, acumulator: Array<Document>) => {
            const assistant = await AdminAssistantUser.findOne({ userName: organizerName});
            if (assistant) {
                acumulator.push(assistant);
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
            organizersDocuments,
            reminderDays, 
            mode, 
            meetingLink, 
            poster, 
            status, 
            evidence,
            comments
        })
        await newActivity.save();
        return res.status(200).json(newActivity)
        
    } catch (error: any) {
        return res.status(500).json({ message: [error] });
    }
}