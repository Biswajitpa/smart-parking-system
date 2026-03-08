import api from "../api/client";
function PaymentButton({ billing, onPaid }) {
  if(!billing) return null;
  const payNow = async () => {
    const { data: order } = await api.post("/payments/create-order", { amount: billing.fee, receiptId: billing.receiptId });
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Smart Parking",
      description: "Parking Fee Payment",
      order_id: order.id,
      handler: async function(response){
        await api.post("/payments/verify", { ...response, receiptId: billing.receiptId });
        onPaid?.();
        alert("Payment successful");
      }
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };
  return <button className="secondary-btn" onClick={payNow}>Pay ₹{billing.fee}</button>;
}
export default PaymentButton;
