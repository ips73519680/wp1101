import { useState } from 'react'
import { sendData, client } from './client';

const useChat = () => {
    const [messages, setMessages] = useState([])
    const [status, setStatus] = useState({})
    const sendMessage = (payload) => {
        sendData(['newMessage', payload]);
    }

    const clearMessages = () => {
        sendData(['clear']);
    }

    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        if (task == 'output') {
            setMessages(() => [...messages, ...payload]);
        }
        else if (task == 'status') {
            setStatus(payload);
        }
        else if (task === 'init') {
            setMessages(() => payload);
        }
        else if (task === 'cleared') {
            setMessages([]);
        }

    }

    return {
        status, messages, sendMessage, clearMessages
    };
};

export default useChat