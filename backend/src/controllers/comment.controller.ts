// Express
import { Request, Response } from "express";
// Models
import { Activity, Comment, Schedule } from "../models";

export const addActivityComment = async (req: Request, res: Response) => {
    try {
        const { activity } = req.params;
        const { content, author } = req.body;
        const activityDocument = await Activity.findById(activity);
        if (!activityDocument) {
            return res.status(404).json({ message: ["Couldn't find the activity to post the comment"]})
        }
        const newComment = new Comment({ content, author, replies: [] });
        await newComment.save();
        activityDocument.comments.push(newComment._id);
        await activityDocument.save();
        return res.status(200).json(newComment);

    } catch (error) {
        return res.status(500).json({ message: [error] });
    }
};

export const addScheduleComment = async (req: Request, res: Response) => {
    try {
        const { schedule } = req.params;
        const { content, author } = req.body;
        const scheduleDocument = await Schedule.findById(schedule);
        if (!scheduleDocument) {
            return res.status(404).json({ message: ["Couldn't find the schedule to post the comment"]})
        }
        const newComment = new Comment({ content, author, replies: [] });
        await newComment.save();
        scheduleDocument.comments.push(newComment._id);
        await scheduleDocument.save();
        return res.status(200).json(newComment);

    } catch (error) {
        return res.status(500).json({ message: [error] });
    }
};

export const addReplyComment = async (req: Request, res: Response) => {
    try {
        const { comment } = req.params;
        const { content, author } = req.body;
        const commentDocument = await Comment.findById(comment);
        if (!commentDocument) {
            return res.status(404).json({ message: ["Couldn't find the comment to reply to"]})
        }
        const newComment = new Comment({ content, author, replies: [] });
        await newComment.save();
        commentDocument.replies.push(newComment._id);
        await commentDocument.save();
        return res.status(200).json(newComment);

    } catch (error) {
        return res.status(500).json({ message: [error] });
    }
};

export const getActivityComments = async (req:Request, res:Response) => {
    try {
        const { activity } = req.params;
        const activityDocument = await Activity
            .findById(activity)
            .populate("comments")
            .populate({ path: "comments.author", select: ["userName"] })
            .populate("comments.replies");
        if (!activityDocument) {
            return res.status(404).json({ message: ["Couldn't find the activity"]})
        }
        return res.status(200).json(activityDocument.comments);
    } catch (error) {
        return res.status(500).json({ message: [error] });
    }
};

export const getScheduleComments = async (req: Request, res: Response) => {
    try {
        const { schedule } = req.params;
        const scheduleDocument = await Schedule
            .findById(schedule)
            .populate("comments")
            .populate({ path: "comments.author", select: ["userName"] })
            .populate("comments.replies");
        if (!scheduleDocument) {
            return res.status(404).json({ message: ["Couldn't find the schedule"]})
        }
        return res.status(200).json(scheduleDocument.comments);
    } catch (error) {
        return res.status(500).json({ message: [error] });
    }
};

export const deleteActivityComment = async (req: Request, res: Response) => {
    try {
        const { activity, comment } = req.params;
        await Comment.findByIdAndDelete(comment);
        const newActivityDocument = await Activity.findByIdAndUpdate(
                activity,
                {  $pull: { comments: comment } }
            )
            .populate("comments")
            .populate({ path: "comments.author", select: ["userName"] })
            .populate("comments.replies");
        if (!newActivityDocument) {
            return res.status(404).json({ message: ["Couldn't find the activity"]})
        }
        return res.status(200).json(newActivityDocument.comments);
    } catch (error) {
        return res.status(500).json({ message: [error] });
    }
};

export const deleteScheduleComment = async (req: Request, res: Response) => {
    try {
        const { schedule, comment } = req.params;
        await Comment.findByIdAndDelete(comment);
        const newScheduleDocument = await Schedule.findByIdAndUpdate(
                schedule,
                {  $pull: { comments: comment } }
            )
            .populate("comments")
            .populate({ path: "comments.author", select: ["userName"] })
            .populate("comments.replies");
        if (!newScheduleDocument) {
            return res.status(404).json({ message: ["Couldn't find the schedule"]})
        }
        return res.status(200).json(newScheduleDocument.comments);
    } catch (error) {
        return res.status(500).json({ message: [error] });
    }
};