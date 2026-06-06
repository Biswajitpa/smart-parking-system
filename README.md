# 🚗 Smart Parking Management System  - (Data Structures + MERN Stack + Real-Time Parking)

<p align="center">

<svg width="900" height="140" xmlns="http://www.w3.org/2000/svg">

  <defs>
    <linearGradient id="textgrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00f7ff">
        <animate attributeName="stop-color" values="#00f7ff;#ff00ff;#00ff85;#00f7ff" dur="4s" repeatCount="indefinite"/>
      </stop>
      <stop offset="100%" stop-color="#0077ff">
        <animate attributeName="stop-color" values="#0077ff;#00ff85;#ff00ff;#0077ff" dur="4s" repeatCount="indefinite"/>
      </stop>
    </linearGradient>
  </defs>

  <rect width="100%" height="100%" fill="#0d1117"/>

  <text x="50%" y="40%" text-anchor="middle"
        font-size="28" font-weight="bold"
        fill="url(#textgrad)"
        font-family="Orbitron">

    🚗 SMART PARKING MANAGEMENT SYSTEM

    <animate attributeName="opacity"
             values="0;1;1;0"
             dur="3s"
             repeatCount="indefinite"/>
  </text>

  <text x="50%" y="75%" text-anchor="middle"
        font-size="16"
        fill="#ffffff"
        font-family="Verdana">

    MERN Stack + Data Structures + Real-Time Parking System

  </text>

</svg>

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

