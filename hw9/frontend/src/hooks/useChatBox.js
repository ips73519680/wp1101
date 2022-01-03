import { useState } from "react"

const useChatBox = () => {
    const [chatBoxes, setChatBoxes] = useState([])

    const createChatBox = (friend, me) => {
        console.log("CreateChatBox: ", friend, me)
        const newKey = me <= friend ? `${me}_${friend}` : `${friend}_${me}`
        if (chatBoxes.some(({ key }) => key === newKey)) {
            throw new Error(friend + "'s chat box has already opened")
        }
        const newChatBoxes = [...chatBoxes]
        const chatLog = []
        newChatBoxes.push({ friend, key: newKey, chatLog })
        setChatBoxes(newChatBoxes)
        // setActiveKey(newKey)
        console.log("NewKey:", newKey)
        return newKey
    }
    const removeChatBox = (targetKey, activeKey) => {
        let newActiveKey = activeKey
        let lastIndex
        chatBoxes.forEach(({ key }, i) => {
            if (key === targetKey) {
                lastIndex = i - 1
            }
        })
        const newChatBoxes = chatBoxes.filter((chatBox) => chatBox.key !== targetKey)
        if (newChatBoxes.length) {
            if (lastIndex >= 0) {
                newActiveKey = newChatBoxes[lastIndex].key
            } else {
                newActiveKey = newChatBoxes[0].key
            }
        } else newActiveKey = ""
        setChatBoxes(newChatBoxes);
        return newActiveKey
    }
    return { chatBoxes, createChatBox, removeChatBox, setChatBoxes }
}
export default useChatBox