import { PubSub } from "graphql-yoga";

const Mutation = {
  async createChatBox(parent, args, { db }, info) {
    // create chatbox in db. Then return a chatbox.

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
    console.log(chatBox)
    return chatBox
  },
  async createMessage(parent, args, { db, pubsub }, info) {
    // create message
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
    const { name, to, body } = args

    const chatBoxName = makeName(name, to);
    const sender = await validateUser(name);
    const receiver = await validateUser(to);
    const chatBox = await validateChatBox(chatBoxName, [sender, receiver])
    const newMessage = new MessageModel({ sender, body });
    await newMessage.save();
    chatBox.messages.push(newMessage);
    await chatBox.save();
    console.log(`New msg! ${newMessage}`)
    console.log('New Boxes:', chatBox)
    pubsub.publish(`message in box ${chatBoxName}`, {
      message: {
        mutation: 'CREATED',
        data: newMessage
      }
    })
    return newMessage
  }
}

export default Mutation