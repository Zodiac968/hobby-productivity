import express from "express"
import auth from "../middleware/auth.js"
import Task from "../models/Task.js";
import Column from "../models/Column.js";

const app = express.Router()

app.post("/initialize", auth, async(req, res) => {
    try {
        let colData = await Column.findOne({userId: req.user.id});
        if(!colData){
            const col = new Column({
                userId: req.user.id,
                todo: [],
                inprogress: [],
                done: []
            })
            await col.save();
        }
        return res.json(colData);
    }
    catch(e) {
        return res.status(500).json({error: e.message});
    }
})

app.get("/column", auth, async(req, res) => {
    try {
        const colData = await Column.findOne({userId: req.user.id});
        if(!colData) return res.json({error: "No Column Data exists"});
        return res.json(colData);
    }
    catch(e) {
        return res.status(500).json({error: e.message});
    }
})

app.put("/column", auth, async(req, res) => {
    try {
        const {todo, inprogress, done} = req.body;
        const saved = await Column.findOneAndUpdate({userId: req.user.id}, {todo, inprogress, done}, {new: true});
        if(!saved) return saved.status(404).json({error: "No column data found"});
        return res.json(saved);
    }
    catch(err){
        return res.status(500).json({error: err.message});
    }
})

//Get all tasks for a logged in user
app.get("/", auth, async (req, res) => {
    try {
        const tasks = await Task.find({userId: req.user.id});
        return res.json(tasks);
    }
    catch(err){
        return res.status(500).json({error: err.message});
    }
});

//Add a new task into the database
app.post("/", auth, async (req, res) => {
    try {
        const {title, description, deadline, status} = req.body;
        const task = new Task({
            title,
            description,
            status,
            deadline,
            userId: req.user.id
        });
        await task.save();
        return res.json(task);
    }
    catch (err) {
        return res.status(500).json({error: err.message});
    }
});

//Update a task 
app.put("/:id", auth, async (req, res) => {
    try{
        const {title, description, deadline, status} = req.body;
        const saved = await Task.findOneAndUpdate(
            {_id: req.params.id, userId: req.user.id}, //from auth middleware
            { title, description, deadline, status }, 
            {new: true}
        );
        if(!saved) return res.status(404).json({error: "Task not found"});
        return res.json(saved);
    }
    catch (err) {
        return res.status(500).json({error: err.message});
    }
});

//Delete a task
app.delete("/:id", auth, async (req, res) => {
    try {
        const saved = await Task.findOneAndDelete({_id: req.params.id, userId: req.user.id});
        if(!saved) return res.status(404).json({error: "Task not found"});
        return res.json({message: "Task deleted"});
    }
    catch (err){
        return res.status(500).json({error: err.message});
    }
});

export default app