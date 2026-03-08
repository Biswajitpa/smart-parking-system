import { useState } from "react";
import api from "../api/client";

function QrPassGenerator() {
  const [form, setForm] = useState({ vehicleNumber:"", ownerName:"", branchCode:"MAIN" });
  const [qrImage, setQrImage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const { data } = await api.post("/utils/qr-pass", form);
    setQrImage(data.qrImage);
  };

  const printPass = () => {
    const win = window.open("", "_blank");
    win.document.write(`<html><body style="font-family:Arial;padding:24px;text-align:center"><h2>Vehicle QR Pass</h2><p>${form.vehicleNumber}</p><p>${form.ownerName}</p><img src="${qrImage}" width="240"/><script>window.print()</script></body></html>`);
    win.document.close();
  };

  return (
    <div className="panel">
      <div className="panel-title"><h2>QR Pass</h2></div>
      <form className="grid-form" onSubmit={submit}>
        <input placeholder="Vehicle Number" value={form.vehicleNumber} onChange={(e)=>setForm({...form, vehicleNumber:e.target.value})} />
        <input placeholder="Owner Name" value={form.ownerName} onChange={(e)=>setForm({...form, ownerName:e.target.value})} />
        <input placeholder="Branch Code" value={form.branchCode} onChange={(e)=>setForm({...form, branchCode:e.target.value})} />
        <button className="primary-btn">Generate QR</button>
      </form>
      {qrImage && <div className="search-result center"><img src={qrImage} alt="QR" width="220" /><button className="secondary-btn" onClick={printPass}>Print QR Pass</button></div>}
    </div>
  );
}
export default QrPassGenerator;
