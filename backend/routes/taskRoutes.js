import express from "express"
import auth from "../middleware/auth.js"
import Task from "../models/Task.js";

const app = express.Router()

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