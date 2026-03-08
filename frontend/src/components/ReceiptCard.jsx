function ReceiptCard({ billing }) {
  if(!billing) return null;
  const printReceipt = () => {
    const win = window.open("", "_blank");
    win.document.write(`<html><body style="font-family:Arial;padding:24px"><h2>Parking Receipt</h2><p><b>Receipt ID:</b> ${billing.receiptId||""}</p><p><b>Vehicle:</b> ${billing.vehicleNumber}</p><p><b>Owner:</b> ${billing.ownerName}</p><p><b>Slot:</b> ${billing.slotNumber}</p><p><b>Hours:</b> ${billing.totalHours}</p><p><b>Fee:</b> ₹${billing.fee}</p><script>window.print()</script></body></html>`);
    win.document.close();
  };
  return (
    <div className="panel">
      <div className="panel-title"><h2>Latest Receipt</h2></div>
      <div className="search-result">
        <p><strong>Receipt ID:</strong> {billing.receiptId}</p>
        <p><strong>Vehicle:</strong> {billing.vehicleNumber}</p>
        <p><strong>Owner:</strong> {billing.ownerName}</p>
        <p><strong>Total Hours:</strong> {billing.totalHours}</p>
        <p><strong>Fee:</strong> ₹{billing.fee}</p>
      </div>
      <button className="primary-btn" onClick={printReceipt}>Download / Print Receipt</button>
    </div>
  );
}
export default ReceiptCard;
