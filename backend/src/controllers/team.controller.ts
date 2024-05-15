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
    const teams = await Team.find({}).populate(
      "students teachers coordinator campusBranch career"
    );
    return res.status(200).json(teams);
  } catch (error) {
    return res.status(500).json({ message: [error] });
  }
};

export const updateTeam = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const updatedTeamData = req.body;
    console.log(updatedTeamData);
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