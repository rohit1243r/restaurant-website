# 🍽️ Restaurant Management System

A full-stack Restaurant Management System built using Node.js, Express.js, MongoDB, EJS, and JavaScript. This project provides a modern restaurant ordering platform with authentication, admin dashboard, cart system, reservations, order management, and responsive UI.

---

# 🚀 Live Features

## 👤 User Features

* User Registration & Login
* Secure Password Hashing using bcrypt
* Session-based Authentication
* Browse Restaurant Menu
* Search Food Items
* Category Filtering
* Add to Cart
* Quantity Increase/Decrease
* Remove Cart Items
* Place Orders
* View Order History
* Table Reservation System
* Contact Form
* Responsive Modern UI

---

## 👨‍💼 Admin Features

* Admin Authentication
* Role-Based Authorization
* Add Food Items
* Edit Food Items
* Delete Food Items
* Upload Food Images using Multer
* Manage Customer Orders
* Update Order Status
* View Customer Messages
* Admin Dashboard Analytics

---

# 🛠️ Tech Stack

| Technology      | Usage            |
| --------------- | ---------------- |
| Node.js         | Backend Runtime  |
| Express.js      | Web Framework    |
| MongoDB         | Database         |
| Mongoose        | MongoDB ODM      |
| EJS             | Template Engine  |
| JavaScript      | Frontend Logic   |
| CSS3            | Styling          |
| Express Session | Authentication   |
| bcryptjs        | Password Hashing |
| connect-flash   | Flash Messages   |
| Multer          | File Upload      |

---

# 📁 Project Structure

```bash
restaurant-website/
│
├── controllers/
├── middleware/
├── models/
├── public/
│   ├── css/
│   ├── images/
│   └── js/
│
├── routes/
├── uploads/
├── views/
│   ├── partials/
│   └── admin/
│
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md
```

---

# 🔐 Authentication & Security

* Passwords are hashed using bcrypt
* Session-based login system
* Protected Routes using middleware
* Admin-only access for food management
* Role-based authorization

---

# 🗄️ Database Models

## User Model

```js
name
email
password
role
```

## Food Model

```js
name
price
image
description
category
```

## Cart Model

```js
userId
foodId
quantity
```

## Order Model

```js
userId
items
totalPrice
status
```

## Reservation Model

```js
userId
name
phone
guests
date
time
```

## Contact Model

```js
name
email
message
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone YOUR_GITHUB_REPO_LINK
```

---

## 2️⃣ Move Into Project Folder

```bash
cd restaurant-website
```

---

## 3️⃣ Install Dependencies

```bash
npm install
```

---

# 🌍 Environment Variables

Create a `.env` file in the root directory.

```env
MONGO_URL=YOUR_MONGODB_CONNECTION_STRING
```

---

# ▶️ Run Project

```bash
npm start
```

Open Browser:

```txt
http://localhost:3000
```

---

# 📸 Image Upload System

This project uses Multer for local image uploads.

Uploaded images are stored inside:

```bash
/uploads
```

---

# 📦 Main Functionalities

## 🍔 Food Management

* Add Food
* Edit Food
* Delete Food
* Upload Images
* Category Filter
* Search Foods

---

## 🛒 Cart System

* Add to Cart
* Remove Cart Items
* Quantity Management
* Total Price Calculation

---

## 📦 Order System

* Place Orders
* Order History
* Order Status Updates
* Admin Order Management

---

## 🍽️ Reservation System

* Book Restaurant Tables
* Store Reservation Details
* User Reservation History

---

## 📞 Contact System

* Customer Contact Form
* Admin Message Viewer

---

# 🎨 UI Features

* Responsive Design
* Modern Dark Theme
* Animated Buttons
* Hover Effects
* Professional Navbar
* Dynamic Cards
* Flash Messages
* Mobile Friendly Layout

---

# 🚀 Deployment

## Recommended Platforms

| Service       | Purpose             |
| ------------- | ------------------- |
| Render        | Backend Hosting     |
| MongoDB Atlas | Cloud Database      |
| GitHub        | Source Code Hosting |

---

# 🌐 Deployment Steps

1. Push project to GitHub
2. Create MongoDB Atlas cluster
3. Add MongoDB URL in Render Environment Variables
4. Deploy using Render Web Service

---

# 👨‍💻 Author

## Rohit Kumar

Full Stack Web Developer

* Node.js
* Express.js
* MongoDB
* JavaScript
* EJS

---

# 📌 Future Improvements

* Online Payment Integration
* Real-time Order Tracking
* Email Notifications
* Cloudinary Image Upload
* Admin Analytics Charts
* Coupon System
* Live Chat Support

---

# ⭐ Conclusion

This project demonstrates a complete full-stack restaurant management platform with modern UI, authentication, admin management, cart system, orders, reservations, and database integration.

It is a portfolio-ready MERN-style backend project built using professional architecture and scalable structure.
