const ChatBox = {
    messages(parent, args, { db }, info) {
        return parent.messages
    }
}

export default ChatBox