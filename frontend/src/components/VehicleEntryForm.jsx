import { useState } from "react";

function VehicleEntryForm({ branches, user, onSubmit }) {
  const [form, setForm] = useState({ vehicleNumber:"", ownerName:"", branchId:"", contactEmail:"", contactPhone:"" });
  const submit = (e) => { e.preventDefault(); onSubmit(form); setForm({ vehicleNumber:"", ownerName:"", branchId:"", contactEmail:"", contactPhone:"" }); };
  return (
    <div className="panel">
      <div className="panel-title"><h2>Vehicle Entry</h2></div>
      <form className="grid-form" onSubmit={submit}>
        <input placeholder="Vehicle Number" value={form.vehicleNumber} onChange={(e)=>setForm({...form, vehicleNumber:e.target.value})} required />
        <input placeholder="Owner Name" value={form.ownerName} onChange={(e)=>setForm({...form, ownerName:e.target.value})} required />
        {user.role==="SUPER_ADMIN" && (
          <select value={form.branchId} onChange={(e)=>setForm({...form, branchId:e.target.value})} required>
            <option value="">Select Branch</option>
            {branches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
          </select>
        )}
        <input placeholder="Email" value={form.contactEmail} onChange={(e)=>setForm({...form, contactEmail:e.target.value})} />
        <input placeholder="Phone" value={form.contactPhone} onChange={(e)=>setForm({...form, contactPhone:e.target.value})} />
        <button className="primary-btn">Park Vehicle</button>
      </form>
    </div>
  );
}
export default VehicleEntryForm;
