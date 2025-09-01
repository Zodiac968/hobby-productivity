import mongoose from "mongoose";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const app = express.Router();

app.post("/register", async (req, res) => {
    try {
    const {name, email, password} = req.body;
    const exists = await User.findOne({email: email});
    if(exists) return res.status(400).json({error: "User already exists"});

    const hashed = await bcrypt.hash(password, 15);

    const user = new User({name, email, password: hashed});
    await user.save();
    return res.status(201).json({message: "New user registered"});
    }
    catch(err) {
        return res.status(500).json({error: err.message});
    }
});

app.post("/login", async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({error: "Invalid Credentials"});
        
        const compare = await bcrypt.compare(password, user.password);
        if(!compare) return res.status(400).json({error: "Invalid Credentials"});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: "1h"});
        res.json({token, user: {id: user._id, email, name: user.name} });
    }
    catch(err){
        return res.status(500).json({error: err.message});
    }
});

export default app;