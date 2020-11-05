import { Schema, model, Document } from 'mongoose';

//Interface for user model.
export interface IMatch extends Document {
    apiId?: number;
    date: Date;
    result: object;
}

//Schema for Matches.
const matchSchema = new Schema({
    apiId: Number,
    date: {
        type: Date,
        required: true,
    },
    result: {
        type: Map,
        of: Number,
        required: true,
    },
});

export default model<IMatch>('Match', matchSchema);
