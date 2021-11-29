import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const scoreCardSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required.']
    },
    subject: {
        type: String,
        required: [true, 'Body field is required.']
    },
    score: {
        type: Number,
        required: [true, 'Body field is required.']
    }
})

const ScoreCard = mongoose.model('ScoreCard', scoreCardSchema)

export default ScoreCard;