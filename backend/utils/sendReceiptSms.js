import twilio from "twilio";
export const sendReceiptSms = async ({to,billing}) => {
  if(!to || !process.env.TWILIO_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE) return { skipped:true };
  const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
  await client.messages.create({ from:process.env.TWILIO_PHONE, to, body:`Receipt ${billing.vehicleNumber} Fee ₹${billing.fee}` });
  return { sent:true };
};
