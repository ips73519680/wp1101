import mongoose from 'mongoose'

const Schema = mongoose.Schema

const MessageSchema = new Schema(
    {
        from: {
            type: String,
            required: [true, 'Name field is required']
        },
        to: {
            type: String,
            required: [true, 'Name field is required']
        },
        body: {
            type: String,
            required: [true, 'Body field is required']
        },
        group: {
            type: String,
            required: [true, 'Group field is required.']
        },
    }
)

const Message = mongoose.model('message', MessageSchema)

export default Message;