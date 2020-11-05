import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';

//Controller to signup.
export const signup = async (req: Request, res: Response) => {
    //New user created with req.body.
    const { username, email, password } = req.body;
    const user: IUser = new User({ username, email, password });
    try {
        //Saving new user.
        user.password = await user.encryptPassword(user.password);
        const savedUser = await user.save();
        //Token.
        const token: string = jwt.sign(
            { _id: savedUser._id },
            process.env.TOKEN_SECRET || 'tokenaux'
        );
        res.header('auth-token', token).json(savedUser);
    } catch (error) {
        res.status(500).send(error);
    }
};

//Controller to signin.
export const signin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const match: boolean = await user.validatePassword(password);
            if (match) {
                const token: string = jwt.sign(
                    { _id: user._id },
                    process.env.TOKEN_SECRET || 'tokenaux',
                    { expiresIn: 60 * 60 * 24 }
                );
                res.header('auth-token', token).json(user);
            } else {
                return res
                    .status(400)
                    .json({ message: 'Email or password is wrong' });
            }
        } else {
            return res
                .status(400)
                .json({ message: 'Email or password is wrong' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

export const profile = async (req: Request, res: Response) => {
    const user = await User.findById(req.userId, { password: 0 });
    if (user) {
        res.json(user);
    } else {
        return res.status(404).json('No user found');
    }
};
