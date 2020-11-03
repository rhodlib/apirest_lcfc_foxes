import {Schema, model, Document} from 'mongoose';
import bcrypt from 'bcryptjs';

//Interface for user model
export interface IUser extends Document{
    username: string,
    email: string,
    password: string,
    encryptPassword(password: string): Promise<string>,
    validatePassword(password: string): Promise<boolean>
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

//Method to encrypt password, return a hashed string
userSchema.methods.encryptPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

//Method to compare password, return a boolean
userSchema.methods.validatePassword = async function(password: string): Promise<boolean> {
    return await bcrypt.compare(this.password, password);
}

export default model<IUser>('User', userSchema);