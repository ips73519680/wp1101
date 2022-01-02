import { useQuery } from "@apollo/client";
import {
    MESSAGES_QUERY,
    MESSAGES_SUBSCRIPTION
} from "../graphql";
import { useEffect, useState } from "react"
import { Tabs, Input, Tag } from "antd";
const { TabPane } = Tabs;

const ChatBox = ({ me, friend, boxName }) => {
    const { loading, error, data, subscribeToMore } = useQuery(MESSAGES_QUERY, { variables: { name: me, to: friend } })
    // const [messages, setMessages] = useState([])
    console.log(me, friend, boxName)
    console.log(data)
    let messages = []
    if (data) {
        messages = data.chatbox.messages
    }

    useEffect(() => {
        try {
            subscribeToMore({
                document: MESSAGES_SUBSCRIPTION,
                variables: { chatBoxName: boxName },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const newMessage = subscriptionData.data.message.data
                    console.log(newMessage)
                    console.log(prev)
                    const newBox = prev
                    console.log(newBox.chatbox.messages)
                    return {
                        ...prev,
                        chatbox: [...prev.chatbox.messages, newMessage]
                    };
                }
            })
        } catch (e) { }
    }, [subscribeToMore])
    return (
        <>
            <p>{friend}'s chatbox.</p>
            {messages.length === 0 ?
                <p style={{ color: '#ccc' }}>
                    No messages...
                </p>
                :
                messages.map(({ sender: { name }, body }) => (
                    name === me ?
                        <p style={{ textAlign: "right" }}>
                            {`${body}   `}
                            <Tag color="blue">{name}</Tag>
                        </p>
                        :
                        <p>
                            <Tag color="blue">{name}</Tag>
                            {body}
                        </p>
                ))}
        </>
    )
}

export default ChatBox