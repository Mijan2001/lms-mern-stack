# Complete Learning Management System

Overview

**A Full-Stack LMS for Course Creation & Learning** is a full-featured **Learning Management System (LMS)** that allows **instructors** to create, manage, and sell online courses, while enabling **students** to browse, purchase, and learn from those courses. Built using the **MERN stack (MongoDB, Express, React, Node.js)**, this platform includes secure authentication, Stripe-powered payments, media uploads via Cloudinary, and a clean, responsive user interface. It’s a scalable solution for online education, designed to provide a smooth experience for both educators and learners.

---

## Project Video Link : https://www.youtube.com/watch?v=Ifj7tgc9qt0

For Login (instructor) :
Email: mijan.cse19@gmail.com
Password : 12345678

For Login (student) :
Email: xyz@gmail.com
Password : 12345678

## 📷 Project Images

### Home Page

![Home Page](./project-images/home-image1.png)

### Admin Dashboard

![Admin Dashboard](./project-images/dashboard1.png)

### Admin Update Page

![Update Page](./project-images/update1.png)

### Admin Panel

![Admin Panel](./project-images/totalsales1.png)

## Key Features

### Authentication & Authorization

-   Secure **user registration and login**
-   Role-based access for **Admin**, **Instructor**, and **Student**
-   Protected routes and dashboard access

### Course Management

-   Instructors can **create**, **update**, and **manage** courses
-   Upload course content using **Cloudinary**
-   Rich text editor for course descriptions

### Student Dashboard

-   View enrolled courses
-   Track **learning progress**
-   Interactive course player

### Payment Integration

-   Seamless course purchase with **Stripe**
-   Webhook support for secure payment verification

### Admin Panel

-   Manage all users and courses
-   Monitor platform activity

### UI/UX Enhancements

-   Fully responsive design
-   **Dark/Light mode** toggle
-   Clean and modern interface using **Tailwind CSS**

### Extra Features

-   Course **search and filtering**
-   Notifications and toast messages
-   Error handling and loading states

---

## Tech Stack

**Frontend:**

-   React.js
-   Tailwind CSS / DaisyUI
-   React Router
-   Axios

**Backend:**

-   Node.js
-   Express.js
-   MongoDB with Mongoose
-   JWT Authentication
-   Stripe API
-   Cloudinary

---

### 1. Clone the Repository

```bash
git clone https://github.com/Mijan2001/lms-mern-stack.git
cd lms-mern
```

### 2. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the **backend** directory and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### 4. Start the Development Server

#### Backend

```bash
cd backend
npm start
```

#### Frontend

```bash
cd frontend
npm run dev
```

### 5. Access the Application

Open your browser and visit:  
Frontend: `http://localhost:5173/`  
Backend API: `http://localhost:8080/auth/api`
