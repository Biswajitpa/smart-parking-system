import QRCode from "qrcode";

export const generateQrPass = async (req,res) => {
  try{
    const { vehicleNumber, ownerName, branchCode="MAIN" } = req.body;
    const qrImage = await QRCode.toDataURL(JSON.stringify({ vehicleNumber, ownerName, branchCode }));
    res.json({ qrImage });
  }catch(error){
    res.status(500).json({message:"QR generation failed", error:error.message});
  }
};
