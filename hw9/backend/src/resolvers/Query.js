import { checkUser, newUser, makeName, checkChatBox, checkMessage, newMessage, newChatBox } from './utility';
const Query = {

  async user(parent, args, { db }, info) {
    const { name, to } = args
    const sender = await checkUser(db, name, "QueryUser");
    if (!sender) sender = await newUser(db, name);
    return sender
  },
  async chatbox(parent, args, { db }, info) {
    const { name, to } = args
    const chatBoxName = makeName(name, to);
    const sender = await checkUser(db, name, "QueryChatbox");
    if (!sender) sender = await newUser(db, name);
    const receiver = await checkUser(db, to, "QueryChatbox");
    if (!receiver) receiver = await newUser(db, to);
    const chatBox = await checkChatBox(chatBoxName, [sender, receiver])
    if (!chatBox) receiver = await newChatBox(db, to);
    return chatBox
  }
}

export default Query