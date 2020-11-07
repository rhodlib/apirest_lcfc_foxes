import { Request, Response } from 'express';
import { getDate } from '../utils/getDate';
import Match from '../models/Match';
import { resultToPoints } from '../utils/resultToPoints';

//Get the last match.
export const getLastMatch = (req: Request, res: Response) =>
    Match.findOne()
        .sort({ date: -1 })
        .then((last) => res.status(200).json(last))
        .catch((err) => res.status(500).json({ message: err }));

//Get match by ID or Date.
export const getByIdOrDate = (req: Request, res: Response) => {
    const { id } = req.params;
    if (id) {
        return Match.findById(id)
            .then((match) => res.status(200).json(match))
            .catch((err) => res.status(404).json(err));
    } else {
        const { from, to } = req.query;
        if (from) {
            return Match.findByDate(from as string, to as string)
                .then((matches) => res.status(200).json(matches))
                .catch((err) => res.status(404).json(err));
        } else {
            res.status(400).json({ message: 'Bad request' });
        }
    }
};

//Create new match
export const createNewMatch = (req: Request, res: Response) => {
    const { result, date } = req.body;
    const match = new Match({ date: getDate(date), result });
    match
        .save()
        .then((match) =>
            res
                .status(201)
                .json({ message: 'match successfully created', match })
        )
        .catch((err) => res.status(400).json(err));
};

//Get points of Leicester city between dates.
export const getPoints = (req: Request, res: Response) => {
    const { from, to } = req.query;
    if (from) {
        Match.findByDate(from as string, to as string)
            .then((matches) =>
                matches.reduce((total, match) => {
                    return resultToPoints(match.result) + total;
                }, 0)
            )
            .then((result) => res.status(200).json(result))
            .catch((err) => res.status(404).json(err));
    } else {
        return res.status(400).json({ message: 'Bad Request' });
    }
};

//Get better opponent against foxes.
export const getBetterOpponent = (req: Request, res: Response) =>
    Match.find({})
        //Filter Leicester city from results.
        .then((matches) =>
            matches.map(
                ({ result }) =>
                    Array.from(result.entries()).filter(
                        ([team]) => team !== 'Leicester City'
                    )[0]
            )
        )
        //Reduce totals.
        .then((results) =>
            results.reduce<Record<string, number>>(
                (total, [team, goals]) => ({
                    ...total,
                    [team]: (total[team] ?? 0) + goals,
                }),
                {}
            )
        )
        //Get best.
        .then(
            (results) =>
                Object.entries(results).sort(
                    ([, goalsA], [, goalsB]) => goalsB - goalsA
                )[0]
        )
        .then(([name = '', score = 0]) => res.json({ name, score }));
