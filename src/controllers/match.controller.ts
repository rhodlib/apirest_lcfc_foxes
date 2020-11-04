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
