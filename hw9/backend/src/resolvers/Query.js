const Query = {
  async user(parent, args, { db }, info) {
    const {
      UserModel,
      ChatBoxModel,
      MessageModel,
      validateUser,
      validateChatBox
    } = db

    const sender = await validateUser(name);
    return sender
  },
  async chatbox(parent, args, { db }, info) {
    const makeName = (name, to) => {
      return [name, to].sort().join('_');
    };
    const {
      UserModel,
      ChatBoxModel,
      MessageModel,
      validateUser,
      validateChatBox
    } = db
    const { name, to } = args
    const chatBoxName = makeName(name, to);
    const sender = await validateUser(name);
    const receiver = await validateUser(to);
    const chatBox = await validateChatBox(chatBoxName, [sender, receiver])
    return chatBox
  }
}

export default Query