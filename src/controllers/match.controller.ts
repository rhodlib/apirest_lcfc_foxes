import { Request, Response } from 'express';
import Match from '../models/Match';

//Get the last match
export const getLastMatch = async (req: Request, res: Response) => {
    const lastMatch = await Match.findOne().sort({ date: -1 });
    if (lastMatch) {
        return res.status(200).json(lastMatch);
    } else {
        return res.status(404).json({ message: 'match not found' });
    }
};

//Get match by ID or Date.
export const getByIdOrDate = async (req: Request, res: Response) => {
    const { id, date } = req.body;
    let match;

    if (id) {
        match = await Match.find({ apiId: id });
    } else if (date) {
        const finalDate = date
            .substring(0, 8)
            .concat(Number(date.substring(8)) + 1);
        match = await Match.find({
            $and: [
                { date: { $gte: new Date(date) } },
                { date: { $lt: new Date(finalDate) } },
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
};
