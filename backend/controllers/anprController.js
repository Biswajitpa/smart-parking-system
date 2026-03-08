export const recognizePlate = async (_req,res) => {
  res.json({
    message:"ANPR placeholder endpoint",
    plateNumber:"OD05AB1234",
    confidence:0.87
  });
};
