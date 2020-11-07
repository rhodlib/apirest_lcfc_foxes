import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

//Interface for user model.
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    encryptPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
}

const validateEmail = function (email: string) {
    const reg: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return reg.test(email);
};

//Schema for Users.
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'The username is required'],
        min: 4,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'The email is required'],
        trim: true,
        lowercase: true,
        validate: [validateEmail, 'Insert a valid email'],
        match: [
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        ],
    },
    password: {
        type: String,
        required: [true, 'The password is required'],
        minlength: 4,
    },
});

/**
 * receives a password and return hashed password.
 *
 * @param password string.
 */
userSchema.methods.encryptPassword = (password: string): Promise<string> =>
    bcrypt.genSalt(10).then((salt) => bcrypt.hashSync(password, salt));

/**
 * receives a password to compare with the user.password in the database
 * and return a boolean.
 *
 * @param password string.
 */
userSchema.methods.validatePassword = async function (
    password: string
): Promise<boolean> {
    return await bcrypt.compareSync(password, this.password);
};

export default model<IUser>('User', userSchema);
