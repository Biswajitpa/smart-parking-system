import nodemailer from "nodemailer";
export const sendReceiptEmail = async ({to,billing}) => {
  if(!to || !process.env.MAIL_USER || !process.env.MAIL_PASS) return { skipped:true };
  const transporter = nodemailer.createTransport({ service:"gmail", auth:{ user:process.env.MAIL_USER, pass:process.env.MAIL_PASS }});
  await transporter.sendMail({
    from:process.env.MAIL_USER,
    to,
    subject:`Parking Receipt - ${billing.vehicleNumber}`,
    html:`<h2>Parking Receipt</h2><p><b>Vehicle:</b> ${billing.vehicleNumber}</p><p><b>Fee:</b> ₹${billing.fee}</p>`
  });
  return { sent:true };
};
