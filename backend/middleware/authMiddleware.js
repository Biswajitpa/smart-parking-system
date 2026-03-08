import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req,res,next) => {
  try{
    const auth = req.headers.authorization || "";
    if(!auth.startsWith("Bearer ")) return res.status(401).json({message:"Unauthorized"});
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if(!user) return res.status(401).json({message:"User not found"});
    req.user = user;
    next();
  }catch{
    res.status(401).json({message:"Invalid token"});
  }
};

export const authorize = (...roles) => (req,res,next) => {
  if(!req.user || !roles.includes(req.user.role)) return res.status(403).json({message:"Access denied"});
  next();
};
