import Branch from "../models/Branch.js";

export const createBranch = async (req,res) => {
  try{
    const branch = await Branch.create(req.body);
    res.status(201).json(branch);
  }catch(error){
    res.status(500).json({message:"Failed to create branch", error:error.message});
  }
};

export const getBranches = async (_req,res) => {
  const branches = await Branch.find().sort({ createdAt:-1 });
  res.json(branches);
};
