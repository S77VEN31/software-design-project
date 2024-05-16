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
    const { id } = req.query;
    const team = await Team.findById(id);
    return res.status(200).json(team);
  } catch (error) {
    return res.status(500).json({ message: [error] });
  }
};

export const getTeams = async (req: Request, res: Response) => {
  try {
    const { userId, roles } = req.query;
    if (!userId || !roles) {
      return res.status(400).json({
        message: ["Se requiere el id del usuario y los roles"],
      });
    }

    const populateString = "students teachers coordinator campusBranch career";
    let teams;

    switch (roles) {
      case "Student":
        teams = await Team.find({ students: userId }).populate(populateString);
        break;
      case "Teacher":
        teams = await Team.find({ teachers: userId }).populate(populateString);
        break;
      case "Coordinator":
        teams = await Team.find({ coordinator: userId }).populate(
          populateString
        );
        break;
      default:
        teams = await Team.find().populate(populateString);
        break;
    }
    return res.status(200).json(teams);
  } catch (error) {
    return res.status(500).json({ message: [error] });
  }
};

export const updateTeam = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const updatedTeamData = req.body;
    const updatedTeam = await Team.findByIdAndUpdate(
      { _id: id },
      updatedTeamData,
      { new: true }
    );
    return res.status(200).json({
      message: ["Equipo actualizado exitosamente"],
      updatedTeam,
    });
  } catch (error: any) {
    return res.status(500).json({ message: [error] });
  }
};

export const deleteTeam = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const deletedTeam = await Team.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: ["Equipo eliminado exitosamente"], deletedTeam });
  } catch (error) {
    return res.status(500).json({ message: [error] });
  }
};