import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"

//Load environment variables from .env file to process.env
dotenv.config();

//Create express app and enable json middleware
const app = express();
app.use(express.json());

//If in dev mode, use cors for communication between frontend and backend
if(process.env.NODE_ENV === "development"){
    app.use(cors({origin: "http://localhost:5173"}));
}

//Connect to mongodb server
mongoose.connect(process.env.MONGO_URI).then(()=>console.log("MongoDB connected."));

app.get("/api/check", (req, res) => {
    res.json({status: "Server is running"});
});

//Serve React in Production UNDERSTAND LATER
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  });
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is listening at http://localhost:${PORT}`));