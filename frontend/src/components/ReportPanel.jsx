import { useState } from "react";
import api from "../api/client";

function ReportPanel({ canView }) {
  const [form, setForm] = useState({ year:"2026", month:"3" });
  const [summary, setSummary] = useState(null);
  if(!canView) return null;

  const load = async () => {
    const { data } = await api.get(`/reports/monthly?year=${form.year}&month=${form.month}`);
    setSummary(data);
  };
  const downloadFile = async (type) => {
    const response = await api.get(`/reports/monthly/${type}?year=${form.year}&month=${form.month}`, { responseType:"blob" });
    const url = URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = `monthly-report-${form.year}-${form.month}.${type === "excel" ? "xlsx" : "pdf"}`;
    a.click();
  };

  return (
    <div className="panel">
      <div className="panel-title"><h2>Monthly Reports</h2></div>
      <div className="grid-form">
        <input value={form.year} onChange={(e)=>setForm({...form, year:e.target.value})} />
        <input value={form.month} onChange={(e)=>setForm({...form, month:e.target.value})} />
        <button className="primary-btn" onClick={load}>Load</button>
        <button className="secondary-btn" onClick={() => downloadFile("excel")}>Excel</button>
        <button className="secondary-btn" onClick={() => downloadFile("pdf")}>PDF</button>
      </div>
      {summary && <div className="search-result"><p><strong>Total Vehicles:</strong> {summary.totalVehicles}</p><p><strong>Total Revenue:</strong> ₹{summary.totalRevenue}</p><p><strong>Total Hours:</strong> {summary.totalHours}</p></div>}
    </div>
  );
}
export default ReportPanel;
