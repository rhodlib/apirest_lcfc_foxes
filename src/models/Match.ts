import { Schema, model, Document, Model } from 'mongoose';
import { nextDay } from '../utils/nextDay';
import { getDate } from '../utils/getDate';

//Interface for user model.
export interface IMatch extends Document {
    apiId?: number;
    date: Date;
    result: Map<string, number>;
}

export interface IMatchStatics extends Model<IMatch> {
    findByDate: (from: string, to?: string) => Promise<IMatch[]>;
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
        validate: {
            validator: (result: Map<string, unknown>) => result.size === 2,
            message: 'Result must have two values',
        },
    },
});

/**
 * Takes timestamps on string format, and transform into Date to search a match or matches in the database
 * @param from string of timestamp.
 * @param to string of timestamp.
 */
matchSchema.statics.findByDate = function (
    from: string,
    to?: string
): Promise<IMatch[]> {
    return this.find({
        $and: [
            { date: { $gte: getDate(from) } },
            { date: { [to ? '$lte' : '$lt']: nextDay(getDate(to ?? from)) } },
        ],
    });
};

export default model<IMatch, IMatchStatics>('Match', matchSchema);
