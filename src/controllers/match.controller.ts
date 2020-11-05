import { Request, Response } from 'express';
import Match, { IMatch } from '../models/Match';

//Get the last match.
export const getLastMatch = async (req: Request, res: Response) => {
    try {
        const lastMatch = await Match.findOne().sort({ date: -1 });
        if (lastMatch) {
            return res.status(200).json(lastMatch);
        } else {
            return res.status(404).json({ message: 'match not found' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

//Get match by ID or Date.
export const getByIdOrDate = async (req: Request, res: Response) => {
    const { id, date } = req.body;
    let match;
    try {
        if (id) {
            match = await Match.findById(id);
        } else if (date) {
            const finalDate: string = date
                .substring(0, 8)
                .concat(Number(date.substring(8)) + 1);
            match = await Match.find({
                $and: [
                    { date: { $gte: new Date(date) } },
                    { date: { $lte: new Date(finalDate) } },
                ],
            });
        } else {
            return res.status(400).json({ message: 'bad request' });
        }

        if (match) {
            return res.status(200).json(match);
        } else {
            return res.status(404).json({ message: 'match not found' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

//Get matches between date range.
export const getByDateRange = async (req: Request, res: Response) => {
    let { from, to } = req.body;
    try {
        if (from && to) {
            to = to.substring(0, 8).concat(Number(to.substring(8)) + 1);
            const match: IMatch[] = await Match.find({
                $and: [
                    { date: { $gte: new Date(from) } },
                    { date: { $lte: new Date(to) } },
                ],
            });
            if (match.length > 0) {
                return res.status(200).json(match);
            } else {
                return res.status(404).json({ message: 'match not found' });
            }
        } else {
            return res.status(400).json({ message: 'bad request' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

//Create new match
export const createNewMatch = async (req: Request, res: Response) => {
    const { result, date } = req.body;
    try {
        const match: IMatch = new Match({ date: new Date(date), result });
        await match.save();
        res.status(201).json(match);
    } catch (error) {
        res.status(500).send(error);
    }
};

//Get better opponent against foxes.
export const getBetterOpponent = async (req: Request, res: Response) => {
    let opponent: any = [];
    const BetterOpponent = await Match.find({});
    console.log(BetterOpponent);
};
