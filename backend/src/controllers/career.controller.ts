// Express
import { Request, Response } from "express";
// Models
import { Career } from "../models";

export const addCareer = async (req: Request, res: Response) => {
  try {
    const { name, code } = req.body;

    const newCareer = new Career({
      name,
      code,
    });
    await newCareer.save();
    return res.status(200).json(newCareer);
  } catch (error: any) {
    return res.status(500).json({ message: [error] });
  }
};

export const getCareer = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;

    const career = await Career.findOne({ code });

    return res.status(200).json(career);
  } catch (error: any) {
    return res.status(500).json({ message: [error] });
  }
};

export const getCareers = async (req: Request, res: Response) => {
  try {
    const careers = await Career.find({});

    return res.status(200).json(careers);
  } catch (error: any) {
    return res.status(500).json({ message: [error] });
  }
};

export const updateCareer = async (req: Request, res: Response) => {
  try {
    const { oldCode } = req.params;
    const { name, code } = req.body;

    const career = await Career.findOne({ code: oldCode });
    if (career) {
      career.name = name;
      career.code = code;
      await career.save();
      return res.status(200).json(career);
    }

    const newCareer = new Career({
      name,
      code,
    });
    await newCareer.save();
    return res.status(200).json(newCareer);
  } catch (error: any) {
    return res.status(500).json({ message: [error] });
  }
};

export const deleteCareer = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    await Career.deleteOne({ code });
    return res
      .status(200)
      .json({ message: ["Deleted the career successfully"] });
  } catch (error: any) {
    return res.status(500).json({ message: [error] });
  }
};