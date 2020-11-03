import {Schema, model} from 'mongoose';

const matchSchema = new Schema({
    apiId: Number,
    date: {
        type: Date,
        required: true
    },
    result: {
        type: Map,
        of: Number,
        required: true
    }
});

export default model('Match', matchSchema);