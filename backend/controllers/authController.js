import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const login = async (req,res) => {
  try{
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() }).populate("branchId","name code");
    if(!user) return res.status(401).json({message:"Invalid credentials"});
    const ok = await bcrypt.compare(password, user.password);
    if(!ok) return res.status(401).json({message:"Invalid credentials"});

    const token = jwt.sign({ userId:user._id, role:user.role }, process.env.JWT_SECRET, { expiresIn:"1d" });
    res.json({
      message:"Login successful",
      token,
      user:{ _id:user._id, name:user.name, email:user.email, role:user.role, branchId:user.branchId }
    });
  }catch(error){
    res.status(500).json({message:"Login failed", error:error.message});
  }
};

export const me = async (req,res) => res.json(req.user);
