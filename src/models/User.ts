import {Schema, model, Document} from 'mongoose';

//Interface for user model
export interface IUser extends Document{
    username: string,
    email: string,
    password: string
}

//Schema for User
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
});

export default model<IUser>('User', userSchema);