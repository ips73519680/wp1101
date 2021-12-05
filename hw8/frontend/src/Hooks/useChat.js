import { useState } from "react";

const client = new WebSocket('ws://localhost:4000')

const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});

    const sendMessage = (payload) => {
        console.log('client input!');
        sendData(["input", payload]);
    }

    const sendData = async (data) => {
        await client.send(
            JSON.stringify(data));
    }
    const clearMessages = () => {
        sendData(["clear"]);
    };


    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        switch (task) {
            case "init": {
                // console.log("init ok!");
                setMessages(() => payload); break;
            }
            case "output": {
                // console.log("output ok!");
                setMessages(() =>
                    [...messages, ...payload]); break;
            }
            case "status": {
                // console.log("status ok!");
                setStatus(payload); break;
            }
            case "cleared": {
                // console.log("cleared ok!");
                setMessages([]);
                break;
            }
            default: break;
        }
    }


    return { status, messages, sendMessage, clearMessages };

};



export default useChat;
