import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "./config/db.js";
import Branch from "./models/Branch.js";
import User from "./models/User.js";

dotenv.config();
await connectDB();

const run = async () => {
  await User.deleteMany({});
  await Branch.deleteMany({});

  const branch = await Branch.create({ name:"Main Branch", code:"MAIN", address:"Demo City" });
  const password = await bcrypt.hash("admin123", 10);

  await User.create([
    { name:"Super Admin", email:"superadmin@parking.com", password, role:"SUPER_ADMIN" },
    { name:"Branch Admin", email:"admin@parking.com", password, role:"ADMIN", branchId:branch._id },
    { name:"Staff User", email:"staff@parking.com", password, role:"STAFF", branchId:branch._id }
  ]);

  console.log("Seed completed");
  process.exit();
};
run();
