
import mongo from './mongo';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import dotenv from 'dotenv'
dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', routes);

mongo.connect();


const server = app.listen(process.env.PORT || 4000, function () {
    console.log('Listening on port ' + server.address().port);
});