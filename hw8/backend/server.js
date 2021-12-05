import WebSocket from 'ws';
import dotenv from 'dotenv'
import express from 'express';
import mongoose from 'mongoose';
import http from 'http'
import { sendData, sendStatus, initData } from './wssConnect';
import Message from './models/message'

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
const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

const broadcastMessage = (data, status) => {
    wss.clients.forEach((client) => {
        sendData(data, client);
        sendStatus(status, client);
    })
}

db.once('open', () => {

    console.log('MongoDB connected!')

    wss.on('connection', (ws) => {
        initData(ws);
        console.log("ws  open!");
        ws.onmessage = async (byteString) => {
            const { data } = byteString
            const [task, payload] = JSON.parse(data);
            switch (task) {
                case 'input': {
                    const { name, body } = payload;
                    const message
                        = new Message({ name, body })
                    try {
                        await message.save();
                    } catch (e) {
                        throw new Error
                            ("Message DB save error: " + e);
                    }
                    // console.log("準備send data!");

                    broadcastMessage(["output", [payload]], {
                        type: 'success',
                        msg: 'Message sent.'
                    });
                    break;
                }
                case 'clear': {
                    console.log("hi clear");
                    Message.deleteMany({}, () => {
                        console.log("hello delete!");
                        broadcastMessage(["cleared", [payload]], {
                            type: 'info', msg: 'Message cache cleared.'
                        });
                    })
                    break;
                }
                default: break

            }
        }
    }
    )
    const PORT = process.env.port || 4000
    server.listen(PORT, function () {
        console.log(`Listening on http://localhost:${PORT}`)
    })

})
