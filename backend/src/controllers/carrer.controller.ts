// Express
import { Request, Response } from "express";
// Models
import { Carrer } from "../models";

export const addCarrer = async (req: Request, res: Response) => {
    try {
        const { name, code } = req.body;

        const newCarrer = new Carrer({
            name,
            code
        }) ;
        await newCarrer.save();
        return res.status(200).json(newCarrer)
    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(400).json({ message: ["Email or username already in use"] })
        }
        return res.status(500).json({ message: [error] });
    }
};

export const getCarrer = async (req: Request, res: Response) => {
    try {
        const { code } = req.params;
        
        const carrer = await Carrer.findOne({ code });

        return res.status(200).json(carrer);
    } catch (error: any) {
        return res.status(500).json({ message: [error] });
    }
};

export const getCarrers = async (req: Request, res: Response) => {
    try {        
        const carrers = await Carrer.find({});

        return res.status(200).json(carrers);
    } catch (error: any) {
        return res.status(500).json({ message: [error] });
    }
};

export const updateCarrer = async (req: Request, res: Response) => {
    try {        
        const { oldCode } = req.params;
        const { name, code } = req.body;

        const carrer =  await Carrer.findOne({ code: oldCode });
        if (carrer) {
            carrer.name = name;
            carrer.code = code;
            await carrer.save();
            return res.status(200).json(carrer)
        }

        const newCarrer = new Carrer({
            name,
            code
        }) ;
        await newCarrer.save();
        return res.status(200).json(newCarrer)

    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(400).json({ message: ["Email or username already in use"] })
        }
        return res.status(500).json({ message: [error] });
    }
};

export const deleteCarrer = async (req: Request, res: Response) => {
    try {
        const { code } = req.params;
        await Carrer.deleteOne({ code });
        return res.status(200).json({ message: ["Deleted the carrer successfully"]})
    } catch (error:any) {
        return res.status(500).json({ message: [error] });
    }
};