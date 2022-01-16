// Buffett
import mongoose from "mongoose";
const Schema = mongoose.Schema;
var url = "";
// users' data (password)
// including the data from teacher card
const UserSchema = new Schema({
    // Required Data
    id: {       // user ID
        type: String,
        required: [true, "Id field is required."],
    },
    username: {     // user 名字
        type: String,
        required: [true, 'Name field is required.'],
    },
    password: {     // user 密碼
        type: String,
        required: [true, 'Password field is required.'],
    },
    email: {
        type: String,
        required: [true, 'Email field is required.'],
    },
    // Not Required Data
    img: {   // URL Link 
        type: String,
        default: url,
    },
    phone: {
        type: String,
        // required: [true, 'phone field is required.'],
    },
    subject: [{       // 科目
        type: String,
    }],
    place: [{   // 地區
        type: String,
    }],
    department: [{  // 系所
        type: String,
    }],
    teachyear: {   // 年資歷
        type: String,
    },
    score: {   // 評分
        type: Number,
    },
    content: {   // 補充資料
        type: String,
    },
    teacherID: [{      // 教師資料中的ID
        type: String,
        required: [true, "Teacher ID field is required."],
    }],
    studentID: [{    // 學生資料中的ID
        type: String,
        required: [true, "Student ID field is required."],
    }],
    caseID: [{       // Case資料中的ID
        type: String,
        required: [true, "Case ID field is required."],
    }],
});

const User = mongoose.model("User", UserSchema);

// case 案件
const CaseSchema = new Schema({
    id: {   // id for 案件
        type: String,
        required: [true, "ID field is required."],
    },
    name: {
        type: String,
        required: [true, "Poster field is required."],
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Email Field is required.'],
    },
    topic: {   // 要求能力 e.g. C++
        type: String,
        required: [true, 'Subject field is required.'],
    },
    way: [{  // 方式 e.g.線上
        type: String,
        required: [true, 'Student level field is required.'],
    }],
    money: {
        type: String,
        required: [true, "Money field is required."],
    },
    teacherreq: {
        type: String,
        required: [true, "teacherreq field is required."],
    },
    content: {      // 大致內容
        type: String,
        required: [true, "content field is required."],
    },
    other: {
        type: String,
        required: [true, "other field is required."],
    },
    date: {     // posting time
        type: Date,
        required: [true, "Date field is required"]
    },
});

const Case = mongoose.model("Case", CaseSchema);

// Students' Card
const StudentSchema = new Schema({
    id: {   // user id
        type: String,
        required: [true, "ID field is required."],
    },
    email: {
        type: String,
        required: [true, 'Email Field is required.'],
    },
    poster: {      // student name
        type: String,
        required: [true, "Name field is required."],
    },
    subject: [{      // 科目
        type: String,
        required: [true, "Subject field is required."],
    }],
    studentlevel: {  // 學生年級
        type: String,
        required: [true, "Student level field is required."],
    },
    place: [{   // 地區
        type: String,
        required: [true, "Place field is required."],
    }],
    money: {  // 期望時薪
        type: String,
        required: [true, "HourMoney field is required."],
    },
    content: {   // 補充資料 (Not necessary)
        type: String,
    },
    postdate: {     // posting time
        type: Date,
        required: [true, "Date field is required."],
    },
    degree: {   // 學習到什麼階段
        type: String,
    },
    hopeContent: {  // 希望上課的內容
        type: String,
    },
    long: {     // 每次上課時間 
        type: String,
    },
    frequency: {     // 多久上一次
        type: String,
    },

});

const Student = mongoose.model("Student", StudentSchema);

export { User, Case, Student };
