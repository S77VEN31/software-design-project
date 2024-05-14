// Express
import { Request, Response } from "express";
// Models
import { Team } from "../models";

export const addTeam = async (req: Request, res: Response) => {
  try {
    const teamData = req.body;
    const team = await new Team(teamData).save();
    return res.status(200).json({
      message: ["Equipo creado exitosamente"],
      team,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res
        .status(400)
        .json({ message: [`El campo ${field} ya está en uso`] });
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
    const teams = await Team.find({}).populate(
      "students teachers coordinator campusBranch career"
    );
    console.log(teams);
    return res.status(200).json(teams);
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
      coordinator,
    });
    await newTeam.save();
    return res.status(200).json(newTeam);
  } catch (error: any) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: ["The team code is already in use"] });
    }
    return res.status(500).json({ message: [error] });
  }
};

export const deleteTeam = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Team.findOneAndDelete({ _id: id });
    return res.status(200).json({ message: ["Equipo eliminado exitosamente"] });
  } catch (error) {
    return res.status(500).json({ message: [error] });
  }
};