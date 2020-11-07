import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

//Interface for Payload.
interface IPayload {
    _id: string;
    iat: number;
    exp: number;
}

//Token validator, middleware to autenticate user.
export const TokenValidation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.header('authtoken');
    if (token) {
        const payload = jwt.verify(
            token,
            process.env.TOKEN_SECRET || 'tokenaux'
        ) as IPayload;
        req.userId = payload._id;
        next();
    } else {
        return res.status(401).json('Access denied');
    }
};
