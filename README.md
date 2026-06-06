# 🚗 Smart Parking Management System  - (Data Structures + MERN Stack + Real-Time Parking)

<p align="center">

<img src="https://readme-typing-svg.herokuapp.com?font=Orbitron&weight=800&size=30&duration=2500&pause=800&color=00F7FF&center=true&vCenter=true&width=1000&lines=🚗+SMART+PARKING+MANAGEMENT+SYSTEM;🧠+MERN+STACK+%2B+DATA+STRUCTURES;⚡+REAL-TIME+PARKING+TRACKING+SYSTEM;🔥+EFFICIENT+%7C+SCALABLE+%7C+MODERN+SOLUTION" />

</p>
A  Smart Parking Management System** built using the **MERN Stack** that automatically assigns parking slots using **Data Structures (Min Heap / Priority Queue)** for efficient slot allocation.

The system supports **vehicle entry, slot booking, QR pass generation, payment integration, real-time slot updates, and an analytics dashboard**.

---

# 📌 Features

## 🚗 Parking Management
- Automatic slot allocation using **Min Heap**
- Real-time parking slot availability
- Vehicle entry and exit management
- Automatic parking fee calculation

## 📅 Slot Booking
- Book parking slots by **floor and zone**
- Prevent duplicate bookings
- **QR pass generation** for bookings

## 💳 Payment Integration
- **Razorpay payment gateway**
- Parking fee payment
- Booking payment
- Payment verification system

## 📊 Dashboard & Reports
- Live parking statistics
- Parking utilization charts
- Vehicle records tracking
- Monthly parking reports

## 🔐 Authentication
Role-based login system:
- Super Admin
- Admin
- Staff

## 📡 Real-Time Updates
Implemented using **Socket.IO**

- Live parking updates across the system
- Instant slot status updates

## 📩 Notifications
- Email receipts (**Nodemailer**)
- SMS receipts (**Twilio integration**)

---

# 🧠 Data Structures Used

## Min Heap (Priority Queue)

Used for **efficient parking slot allocation**.

### Algorithm
1. Store all free slots in a **MinHeap**
2. Extract the **smallest slot number** when a vehicle enters
3. Mark the slot as **occupied**
4. When the vehicle exits, **insert the slot back into the heap**

### Time Complexity

| Operation | Complexity |
|----------|------------|
| Insert Slot | O(log n) |
| Remove Slot | O(log n) |
| Get Nearest Slot | O(1) |

---

# 🛠 Tech Stack

## Frontend
- React
- JavaScript
- CSS
- Chart.js

## Backend
- Node.js
- Express.js

## Database
- MongoDB

## Real-Time Communication
- Socket.IO

## 💳 Payment Gateway
- Razorpay

## Notifications
- Nodemailer
- Twilio

---

## 🏗 System Architecture
<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/7954d33b-4231-4b5f-a794-8faa828f32c2" />

