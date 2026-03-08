import ParkingHistory from "../models/ParkingHistory.js";
import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";
import { getBranchFilter } from "../utils/branchFilter.js";

export const getMonthlyReport = async (req,res) => {
  try{
    const { year, month } = req.query;
    const startDate = new Date(Number(year), Number(month)-1, 1);
    const endDate = new Date(Number(year), Number(month), 1);

    const records = await ParkingHistory.find({
      ...getBranchFilter(req),
      exitTime:{ $gte:startDate, $lt:endDate }
    }).sort({ exitTime:-1 });

    const totalVehicles = records.length;
    const totalRevenue = records.reduce((s,r)=>s+(r.fee||0),0);
    const totalHours = records.reduce((s,r)=>s+(r.totalHours||0),0);

    res.json({ totalVehicles, totalRevenue, totalHours, records });
  }catch(error){
    res.status(500).json({message:"Report failed", error:error.message});
  }
};

export const exportMonthlyExcel = async (req,res) => {
  const { year, month } = req.query;
  const startDate = new Date(Number(year), Number(month)-1, 1);
  const endDate = new Date(Number(year), Number(month), 1);

  const records = await ParkingHistory.find({
    ...getBranchFilter(req),
    exitTime:{ $gte:startDate, $lt:endDate }
  }).lean();

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Monthly Report");
  sheet.columns = [
    {header:"Receipt ID", key:"receiptId", width:22},
    {header:"Vehicle", key:"vehicleNumber", width:18},
    {header:"Owner", key:"ownerName", width:20},
    {header:"Slot", key:"slotNumber", width:10},
    {header:"Floor", key:"floor", width:10},
    {header:"Zone", key:"zone", width:10},
    {header:"Hours", key:"totalHours", width:10},
    {header:"Fee", key:"fee", width:10},
    {header:"Payment", key:"paymentStatus", width:12}
  ];
  records.forEach(r => sheet.addRow(r));
  res.setHeader("Content-Type","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  res.setHeader("Content-Disposition",`attachment; filename=monthly-report-${year}-${month}.xlsx`);
  await workbook.xlsx.write(res);
  res.end();
};

export const exportMonthlyPdf = async (req,res) => {
  const { year, month } = req.query;
  const startDate = new Date(Number(year), Number(month)-1, 1);
  const endDate = new Date(Number(year), Number(month), 1);
  const records = await ParkingHistory.find({
    ...getBranchFilter(req),
    exitTime:{ $gte:startDate, $lt:endDate }
  }).lean();
  const totalRevenue = records.reduce((s,r)=>s+(r.fee||0),0);

  res.setHeader("Content-Type","application/pdf");
  res.setHeader("Content-Disposition",`attachment; filename=monthly-report-${year}-${month}.pdf`);
  const doc = new PDFDocument({ margin:40 });
  doc.pipe(res);
  doc.fontSize(18).text("Smart Parking Monthly Report",{ align:"center" });
  doc.moveDown();
  doc.fontSize(12).text(`Year: ${year}`);
  doc.text(`Month: ${month}`);
  doc.text(`Total Records: ${records.length}`);
  doc.text(`Total Revenue: ₹${totalRevenue}`);
  doc.moveDown();
  records.slice(0,50).forEach((r,i)=>doc.text(`${i+1}. ${r.vehicleNumber} | ${r.ownerName} | Slot ${r.slotNumber} | ₹${r.fee}`));
  doc.end();
};
