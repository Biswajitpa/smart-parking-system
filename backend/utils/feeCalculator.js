export const calculateParkingFee = (entryTime, exitTime) => {
  const diff = new Date(exitTime) - new Date(entryTime);
  const totalHours = Math.max(1, Math.ceil(diff / (1000 * 60 * 60)));
  let fee = 30;
  if (totalHours > 1) fee += (totalHours - 1) * 15;
  return { totalHours, fee };
};
