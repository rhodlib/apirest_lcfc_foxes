import {Request, Response} from 'express';

export const signup = (req: Request, res: Response) => {
    res.send("SignUp");
}

export const signin = (req: Request, res: Response) => {
    res.send("SignIn");
}

export const profile = (req: Request, res: Response) => {
    res.send("Profile");
}