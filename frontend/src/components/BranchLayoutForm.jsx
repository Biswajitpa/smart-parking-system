import { useState } from "react";
import api from "../api/client";

function BranchLayoutForm({ branches, onDone }) {
  const [form, setForm] = useState({ branchId:"", floors:2, zonesPerFloor:"A,B", slotsPerZone:5 });
  const submit = async (e) => {
    e.preventDefault();
    await api.post("/layout/initialize", {
      branchId: form.branchId,
      floors: Number(form.floors),
      zonesPerFloor: form.zonesPerFloor.split(",").map(z => z.trim().toUpperCase()),
      slotsPerZone: Number(form.slotsPerZone)
    });
    onDone?.();
  };
  return (
    <div className="panel">
      <div className="panel-title"><h2>Initialize Layout</h2></div>
      <form className="grid-form" onSubmit={submit}>
        <select value={form.branchId} onChange={(e)=>setForm({...form, branchId:e.target.value})} required>
          <option value="">Select Branch</option>
          {branches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
        </select>
        <input type="number" value={form.floors} onChange={(e)=>setForm({...form, floors:e.target.value})} />
        <input value={form.zonesPerFloor} onChange={(e)=>setForm({...form, zonesPerFloor:e.target.value})} />
        <input type="number" value={form.slotsPerZone} onChange={(e)=>setForm({...form, slotsPerZone:e.target.value})} />
        <button className="primary-btn">Create Layout</button>
      </form>
    </div>
  );
}
export default BranchLayoutForm;
