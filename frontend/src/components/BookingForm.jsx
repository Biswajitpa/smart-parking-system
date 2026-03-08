import { useState } from "react";
function BookingForm({ branches, user, onSubmit }) {
  const [form, setForm] = useState({ vehicleNumber:"", ownerName:"", floor:1, zone:"A", branchId:"" });
  const submit = (e) => { e.preventDefault(); onSubmit(form); };
  return (
    <div className="panel">
      <div className="panel-title"><h2>Book Slot</h2></div>
      <form className="grid-form" onSubmit={submit}>
        <input placeholder="Vehicle Number" value={form.vehicleNumber} onChange={(e)=>setForm({...form, vehicleNumber:e.target.value})} required />
        <input placeholder="Owner Name" value={form.ownerName} onChange={(e)=>setForm({...form, ownerName:e.target.value})} required />
        {user.role==="SUPER_ADMIN" && (
          <select value={form.branchId} onChange={(e)=>setForm({...form, branchId:e.target.value})} required>
            <option value="">Select Branch</option>
            {branches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
          </select>
        )}
        <input type="number" value={form.floor} onChange={(e)=>setForm({...form, floor:e.target.value})} />
        <select value={form.zone} onChange={(e)=>setForm({...form, zone:e.target.value})}>
          <option value="A">Zone A</option><option value="B">Zone B</option><option value="C">Zone C</option>
        </select>
        <button className="secondary-btn">Book</button>
      </form>
    </div>
  );
}
export default BookingForm;
