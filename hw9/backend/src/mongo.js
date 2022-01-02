
import dotenv from 'dotenv'
import mongoose from 'mongoose';

export default () => {
    dotenv.config();

    if (!process.env.MONGO_URL) {
        console.log("missing MONGO_URL!!");
        process.exit(1);
    }
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    const db = mongoose.connection

    db.once('open', () => {
        console.log('MongoDB connected!')
    }
    )

}


