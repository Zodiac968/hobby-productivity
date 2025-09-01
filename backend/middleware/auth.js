import jwt from "jsonwebtoken"

export default function (req, res, next) {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if(!token) return res.status(401).json({error: "Access Denied"}); 
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch(err){
        return res.status(500).json({error: err.message});
    }
}
