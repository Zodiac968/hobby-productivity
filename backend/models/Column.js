import mongoose from "mongoose"
import User from "./User.js"
import Task from "./Task.js"

const columnSchema = mongoose.Schema({
    userId: {type: mongoose.Types.ObjectId, ref: User, required: true, unique:true},
    todo: [{type: mongoose.Types.ObjectId, ref: Task}],
    inprogress: [{type: mongoose.Types.ObjectId, ref: Task}],
    done: [{type: mongoose.Types.ObjectId, ref: Task}]
})

export default mongoose.model("Columns", columnSchema);