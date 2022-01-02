

const makeName = (name1, name2) => {
    return [name1, name2].sort().join("-");
}

// return the found user (can be null)
const checkUser = (db, name, errFunc) => {
    if (!name) throw new Error("Missing user name for " + errFunc);
    return db.UserModel.findOne({ name });
};

// make sure calling checkUser beforehand
const newUser = (db, name) => {
    console.log("newUser");
    return new db.UserModel({ name }).save();
};

const newChatBox = (db, chatBoxName) => {
    return new db.ChatBoxModel({ name: chatBoxName }).save();
}


const newMessage = (db, sender, body) => {
    return new db.MessageModel({ sender, body }).save;
}


// makeName, checkChatBox, checkMessage, newMessage, newChatBox

const checkChatBox = (db, chatBoxName, errFunc) => {
    if (!checkChatBox) throw new Errer("missing chatBox name for" + errFunc);
    return db.ChatBoxModel.findOne({ name: chatBoxName });
};

const checkMessage = async (db, from, to, message, errFunc) => {
    const checkBoxName = makeName(from, to);
    return {
        chatBox: await checkChatBox(db, from, errFunc),
        sender: await checkUser(db, from, errFunc),
        to: await checkUser(db, to, errFunc)
    }
};

export {
    makeName,
    checkChatBox,
    checkUser,
    checkMessage,
    newChatBox,
    newUser,
    newMessage
}