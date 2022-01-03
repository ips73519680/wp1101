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

const validateUser = async (name) => {
    console.log("test validateUser");
    const existing = await UserModel.findOne({ name });
    if (existing) return existing;
    return new UserModel({ name }).save();
};

const validateChatBox = async (name, participants) => {
    console.log("test validateChatBox");
    const existing = await UserModel.findOne({ name });
    if (!existing) new UserModel({ name }).save();

    const participant = await UserModel.findOne({ participants });
    if (!participant) new UserModel({ participants }).save();

    let box = await ChatBoxModel.findOne({ name });
    if (box) return box;
    return new ChatBoxModel({ name, users: participants }).save();

};

const UserModel = mongoose.model('User', userSchema);
const ChatBoxModel = mongoose.model('ChatBox', chatBoxSchema);
const MessageModel = mongoose.model('Message', messageSchema);

const db = {
    UserModel,
    ChatBoxModel,
    MessageModel,
    validateUser,
    validateChatBox
}

export default db