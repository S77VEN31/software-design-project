// Express
import { Request, Response } from "express";
// Models
import { CampusBranch } from "../models";

export const addCampusBranch = async (req: Request, res: Response) => {
    try {
        const { 
            name,
            initials,
            code,
            location,
            carrers
        } = req.body;

        const newCampusBranch = new CampusBranch({
            name,
            initials,
            code,
            location,
            carrers
        });
        await newCampusBranch.save();
        return res.status(200).json(newCampusBranch)
    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(400).json({ message: ["Campus branch code already in use"] })
        }
        return res.status(500).json({ message: [error] });
    }
};

export const getCampusBranch = async (req: Request, res: Response) => {
    try {
        const { code } = req.params;
        
        const campusBranch = await CampusBranch
            .findOne({ code })
            .populate("careers");

        return res.status(200).json(campusBranch);
    } catch (error: any) {
        return res.status(500).json({ message: [error] });
    }
};

export const getCampusBranches = async (req: Request, res: Response) => {
    try {        
        const campusBranches = await CampusBranch.find({});

        return res.status(200).json(campusBranches);
    } catch (error: any) {
        return res.status(500).json({ message: [error] });
    }
};

export const updateCampusBranches = async (req: Request, res: Response) => {
    try {        
        const { code } = req.params;
        const { 
            name,
            initials,
            location,
            careers
        } = req.body;

        const campusBranch =  await CampusBranch.findOne({ code });
        if (campusBranch) {
            campusBranch.name = name;
            campusBranch.initials = initials;
            campusBranch.location = location;
            campusBranch.careers = careers;
            await campusBranch.save();
            return res.status(200).json(campusBranch)
        }

        const newCampusBranch = new CampusBranch({
            name,
            initials,
            code,
            location,
            careers
        });
        await newCampusBranch.save();
        return res.status(200).json(newCampusBranch);

    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(400).json({ message: ["Campus branch code already in use"] })
        }
        return res.status(500).json({ message: [error] });
    }
};

export const deleteCampusBranches = async (req: Request, res: Response) => {
    try {
        const { code } = req.params;
        await CampusBranch.deleteOne({ code });
        return res.status(200).json({ message: ["Deleted the campus branch successfully"]})
    } catch (error:any) {
        return res.status(500).json({ message: [error] });
    }
};