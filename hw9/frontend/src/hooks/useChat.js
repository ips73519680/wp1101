import { useState } from "react"
const useChat = (addMsg) => {
    const [status, setStatus] = useState({})
    const sendMessage = ({ sender, friend, body }) => {

        addMsg({ variables: { name: sender, to: friend, body: body } })
    }
    return { status, sendMessage }
}
export default useChat