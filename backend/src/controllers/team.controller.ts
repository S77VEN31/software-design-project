// Express
import { Request, Response } from "express";
// Models
import { Team } from "../models";

export const addTeam = async (req: Request, res: Response) => {
    try {
        const { code, name, description, students, teachers, coordinator } = req.body;
        let studentList:string[] = [];
        if (students) {
            studentList.concat(students);
        }
        const newTeam = new Team({
            code,
            name,
            description,
            students: studentList,
            teachers,
            coordinator
        });
        await newTeam.save();
        return res.status(200).json(newTeam);
    } catch (error:any) {
        if (error.code === 11000) {
            return res.status(400).json({ message: ["The team code is already in use"]});
        }
        return res.status(500).json({ message: [error] });
    }
};

export const getTeam = async (req: Request, res: Response) => {
    try {
        const { code } = req.params;
        const team = await Team.findOne({ code });
        return res.status(200).json(team);
    } catch (error) {
        return res.status(500).json({ message: [error] });
    }
};

export const getTeams = async (req: Request, res: Response) => {
    try {
        const teams = await Team.find({});

        return res.status(200).json(teams)
    } catch (error) {
        return res.status(500).json({ message: [error] });
    }
};

export const updateTeam = async (req: Request, res: Response) => {
    try {
        const { code } = req.params;
        const { name, description, students, teachers, coordinator } = req.body;

        const team = await Team.findOne({ code });
        if (team) {
            team.name = name;
            team.description = description;
            team.students = students;
            team.teachers = teachers;
            team.coordinator = coordinator;
            await team.save();
            return res.status(200).json(team);
        }

        const newTeam = new Team({
            code,
            name,
            description,
            students,
            teachers,
            coordinator    
        });
        await newTeam.save();
        return res.status(200).json(newTeam);
    } catch (error:any) {
        if (error.code === 11000) {
            return res.status(400).json({ message: ["The team code is already in use"]});
        }
        return res.status(500).json({ message: [error] });
    }
};

export const deleteTeam = async (req: Request, res: Response) => {
    try {
        const { code } = req.params;
        await Team.deleteOne({ code });
        return res
        .status(200)
        .json({ message: ["Deleted the team successfully"]});
    } catch (error) {
        return res.status(500).json({ message: [error] });
    }
};