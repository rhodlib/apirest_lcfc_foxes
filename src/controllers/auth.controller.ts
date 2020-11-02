import {Request, Response} from 'express';
import User, {IUser} from '../models/User';
import jwt from 'jsonwebtoken';

export const signup = async(req: Request, res: Response) => {
    //Saving new user
    const {username, email, password} = req.body;
    const user: IUser = new User({ username, email, password});  
    const savedUser = await user.save();
    //Token
    jwt.sign({_id: savedUser._id}, process.env.TOKEN_SECRET || "tokenaux")
    res.send("SignUp");
}

export const signin = (req: Request, res: Response) => {
    res.send("SignIn");
}

export const profile = (req: Request, res: Response) => {
    res.send("Profile");
}