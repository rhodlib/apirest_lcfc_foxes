import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

//Controller to signup.
export const signup = (req: Request, res: Response) => {
    //New user created with req.body.
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    user.encryptPassword(user.password)
        .then((hashedPassword) => {
            user.password = hashedPassword;
            return user.save().then((savedUser) => {
                const token: string = jwt.sign(
                    { _id: savedUser._id },
                    process.env.TOKEN_SECRET || 'tokenaux'
                );
                res.header('authtoken', token).status(201).json({
                    message: 'User created sucessfully',
                });
            });
        })
        .catch((err) => res.status(400).json({ message: 'Bad request', err }));
};

//Controller to signin.
export const signin = (req: Request, res: Response) => {
    const { email, password } = req.body;
    User.findOne({ email })
        .then((user) => {
            if (user) {
                user.validatePassword(password).then((validate) => {
                    console.log(validate);
                    if (validate) {
                        const token: string = jwt.sign(
                            { _id: user._id },
                            process.env.TOKEN_SECRET || 'tokenaux',
                            { expiresIn: 60 * 60 * 24 }
                        );
                        res.header('authtoken', token).json({
                            message: 'Login successfully',
                        });
                    } else {
                        res.status(400).json({
                            message: 'Email or password is wrong',
                        });
                    }
                });
            } else {
                res.status(400).json({ message: 'Email or password is wrong' });
            }
        })
        .catch((err) => res.status(400).json({ err }));
};
