🚗 Smart Parking Management System
(Data Structures + MERN Stack + Real-Time Parking)
1. Introduction

The Smart Parking Management System is a web-based application developed using the MERN Stack (MongoDB, Express.js, React, Node.js).
The system automatically allocates parking slots using Data Structures such as Min Heap (Priority Queue) to ensure efficient slot management.

This system allows users to:

Book parking slots

Manage vehicle entry and exit

Generate QR passes

Make online payments

View real-time parking availability

Monitor parking analytics

The main goal of this project is to optimize parking management and reduce manual parking operations.

2. Features
2.1 Parking Management

Automatic slot allocation using Min Heap

Real-time parking slot availability

Vehicle entry and exit management

Automatic parking fee calculation

2.2 Slot Booking

Booking parking slots based on floor and zone

Preventing duplicate slot bookings

QR Pass generation for each booking

2.3 Payment Integration

Integrated Razorpay payment gateway

Parking fee payment

Booking payment

Payment verification system

2.4 Dashboard and Reports

Live parking statistics

Parking utilization charts

Vehicle records tracking

Monthly parking reports

2.5 Authentication System

Role-based authentication is implemented with the following user roles:

Super Admin

Admin

Staff

2.6 Real-Time Updates

The system uses Socket.IO to provide real-time updates.

Features include:

Live parking status updates

Instant slot availability changes

Synchronization across all connected users

2.7 Notifications

The system provides automatic notifications using:

Email receipts via Nodemailer

SMS receipts via Twilio

3. Data Structures Used
Min Heap (Priority Queue)

The Min Heap data structure is used to allocate parking slots efficiently.

Algorithm Steps

Store all available parking slots in a Min Heap.

When a vehicle enters, the system extracts the smallest slot number.

The slot is marked as occupied.

When the vehicle exits, the slot is reinserted into the heap.

Time Complexity
Operation	Complexity
Insert Slot	O(log n)
Remove Slot	O(log n)
Get Nearest Slot	O(1)
4. Technology Stack
Frontend

React.js

JavaScript

CSS

Chart.js

Backend

Node.js

Express.js

Database

MongoDB

Real-Time Communication

Socket.IO

Payment Gateway

Razorpay

Notification Services

Nodemailer

Twilio

5. System Architecture

The system architecture consists of the following layers:

Frontend Layer
Built using React to provide the user interface.

Backend Layer
Node.js and Express.js handle APIs and business logic.

Database Layer
MongoDB stores user data, booking details, and parking records.

Algorithm Layer
Min Heap algorithm manages efficient parking slot allocation.

6. Project Structure
smart_parking_placement_project

backend
 ├── controllers
 ├── models
 ├── routes
 ├── utils
 ├── config
 └── server.js

frontend
 ├── components
 ├── api
 ├── pages
 └── App.jsx

README.md
7. Installation Guide
Step 1: Clone the Repository
git clone https://github.com/yourusername/smart-parking-system.git
Step 2: Install Backend Dependencies
cd backend
npm install

Run backend server:

npm run dev
Step 3: Install Frontend Dependencies
cd frontend
npm install
npm run dev
8. Environment Variables

Create a .env file inside the backend folder.

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/smartParkingPlacement
JWT_SECRET=your_secret

RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=your_secret

MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password

TWILIO_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE=+10000000000
9. Default Login Credentials

Super Admin Login:

Email:

superadmin@parking.com

Password:

admin123
10. Future Improvements

The following features can be added in the future:

AI-based parking prediction

License plate recognition system

Mobile application support

IoT sensor integration

Smart city parking integration

11. Learning Outcomes

This project demonstrates:

Practical use of Data Structures and Algorithms

Full Stack Web Development

Database design and management

Payment gateway integration

Real-time web application development

12. License

This project is developed for educational and placement purposes.
