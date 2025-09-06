import mongoose from "mongoose"
import User from "./User.js"

const taskSchema = new mongoose.Schema({
    title : {type: String, required: true},
    description : {type: String},
    status : {type : String, enum: ["todo", "in-progress", "done"], default: "todo"},
    deadline : {type: Date},
    userId : {type: mongoose.Schema.Types.ObjectId, ref: User, required: true}
}, {timestamps: true});

export default mongoose.model("Task", taskSchema);