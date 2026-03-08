import { useState } from "react";
import api from "../api/client";

function Login({ onLogin }) {
  const [form, setForm] = useState({ email:"", password:"" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const { data } = await api.post("/auth/login", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      onLogin(data.user);
    }catch(error){
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>Smart Parking</h1>
        <p>Placement Project Admin Panel</p>
        <input type="email" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} required />
        <input type="password" placeholder="Password" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} required />
        <button type="submit" className="primary-btn">Login</button>
        {message && <div className="alert-box">{message}</div>}
        <small>Demo: superadmin@parking.com / admin123</small>
      </form>
    </div>
  );
}
export default Login;
