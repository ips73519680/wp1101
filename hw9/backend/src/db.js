
// import mongoose from "mongoose"

// const { Schema } = mongoose;
// const ChatBoxSchema = new Schema({
//     name: { type: String, required: true },
//     messages: [{ type: mongoose.Types.ObjectId, ref: "Message" }],
// });
// const MessageSchema = new Schema({
//     sender: { type: mongoose.Types.ObjectId, ref: "User" },
//     body: { type: String, required: true },
// });
// const UserSchema = new Schema({
//     name: { type: String, required: true },
// });

// const UserModel = mongoose.model("User", UserSchema);
// const ChatBoxModel = mongoose.model("ChatBox", ChatBoxSchema);
// const MessageModel = mongoose.model("Message", MessageSchema);

// export { UserModel, ChatBoxModel, MessageModel }


import mongoose from 'mongoose'

const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    chatBoxes: [{ type: mongoose.Types.ObjectId, ref: 'ChatBox' }],
});

const messageSchema = new Schema({
    chatBox: { type: mongoose.Types.ObjectId, ref: 'ChatBox' },
    sender: { type: mongoose.Types.ObjectId, ref: 'User' },
    body: { type: String, required: true },
});

const chatBoxSchema = new Schema({
    name: { type: String, required: true },
    users: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    messages: [{ type: mongoose.Types.ObjectId, ref: 'Message' }],
});


///====進階要求===
// const validateUser = async (name) => {
//     const existing = await UserModel.findOne({ name });
//     if (existing) return existing;
//     return new UserModel({ name }).save();
// };

// const validateChatBox = async (name, participants) => {
//     let box = await ChatBoxModel.findOne({ name });
//     if (box) console.log("box exist!")
//     if (!box) box = await new ChatBoxModel({ name, users: participants }).save();
//     return box
//         .populate('users')
//         .populate({ path: 'messages', populate: 'sender' })
//         .execPopulate();
// };

const UserModel = mongoose.model('User', userSchema);
const ChatBoxModel = mongoose.model('ChatBox', chatBoxSchema);
const MessageModel = mongoose.model('Message', messageSchema);

const db = {
    UserModel,
    ChatBoxModel,
    MessageModel
}

export default db