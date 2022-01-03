import "./App.css"
import { useEffect, useState } from "react"
import { Tabs, Input, Tag } from "antd";
import ChatModal from '../components/ChatModal'
import useChatBox from '../hooks/useChatBox'
import displayStatus from "../components/DisplayStatus";
import useChat from "../hooks/useChat";
import { useMutation } from "@apollo/client";
import {
    CREATE_CHATBOX_MUTATION,
    CREATE_MESSAGE_MUTATION,
} from "../graphql";
import ChatBox from '../components/ChatBox'
const { TabPane } = Tabs;
const ChatRoom = ({ me }) => {
    const [addBox] = useMutation(CREATE_CHATBOX_MUTATION)
    const [addMsg] = useMutation(CREATE_MESSAGE_MUTATION)

    const [messageInput, setMessageInput] = useState("")
    const [modalVisible, setModalVisible] = useState(false)
    const [activeKey, setActiveKey] = useState("")
    const { chatBoxes, createChatBox, removeChatBox, setChatBoxes } = useChatBox()
    const { status, sendMessage } = useChat(addMsg)
    const addChatBox = () => {
        setModalVisible(true)
    }

    const findFriend = (activeKey) => {
        console.log(chatBoxes)
        console.log(activeKey)
        let friend = null
        chatBoxes.forEach((chatbox) => {
            if (chatbox.key === activeKey) {
                friend = chatbox.friend
            }
        })
        console.log("find friend" + friend);
        return friend
    }

    console.log("re-render!")
    console.log(chatBoxes)

    return (
        <>
            <div className="App-title"><h1>{me}'s Chat Room</h1></div>
            <div className="App-messages">
                <Tabs
                    type="editable-card"
                    activeKey={activeKey}
                    onChange={(key) => { setActiveKey(key) }}
                    onEdit={(targetKey, action) => {
                        if (action === "add") addChatBox()
                        else if (action === "remove") setActiveKey(removeChatBox(targetKey, activeKey))
                    }}
                >
                    {chatBoxes.map(({ friend, key, chatLog }) => {
                        console.log(friend, key, chatLog);
                        return (
                            <TabPane
                                tab={friend}
                                key={key}
                                closable={true}
                            >
                                <ChatBox me={me} friend={friend} boxName={key} />
                            </TabPane>
                        )
                    })}
                </Tabs>
                <ChatModal
                    visible={modalVisible}
                    onCreate={async ({ name }) => {
                        console.log(name)
                        setActiveKey(createChatBox(name, me))
                        await addBox({ variables: { name: me, to: name } })
                        setModalVisible(false)
                    }}
                    onCancel={() => { setModalVisible(false) }}
                />
            </div>
            <Input.Search
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                enterButton="Send"
                placeholder="Enter message here..."
                onSearch={(msg) => {
                    if (!msg) {
                        displayStatus({
                            type: "error",
                            msg: "Please enter message"
                        })
                        return
                    } else if (activeKey === "") {
                        displayStatus({
                            type: "error",
                            msg: "Please add a chatbox first."
                        })
                        setMessageInput("")
                        return
                    }
                    sendMessage({ sender: me, friend: findFriend(activeKey), body: msg })
                    setMessageInput("")
                }}
            ></Input.Search>

        </>
    )
}
export default ChatRoom