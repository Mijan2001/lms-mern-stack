# Fullstack LMS App

A **Fullstack Learning Management System (LMS) App** built from scratch using **ReactJS, Express, NodeJS, and MongoDB**. This project is perfect for those looking to enhance their web development skills and add a valuable project to their portfolio.

## Features

-   User authentication (Login/Signup)
-   Course creation and management
-   User profile with learning progress
-   Payment integration using Stripe
-   Light/Dark mode support
-   Protected routes for different user roles
-   File uploads with Cloudinary
-   Dashboard for admin and users
-   Search and filter functionality
-   Webhooks for payment processing

## Technologies Used

-   **Frontend:** ReactJS, Redux (RTK Query), Shadcn UI, Tailwind CSS
-   **Backend:** NodeJS, Express, MongoDB, Mongoose
-   **Authentication:** JWT (JSON Web Token)
-   **Storage:** Cloudinary (for image and file uploads)
-   **Payment Gateway:** Stripe
-   **Routing:** React Router Dom

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/lms-fullstack.git
cd lms-fullstack
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

## Contributing

Contributions are welcome! Feel free to fork this repository and submit a pull request.

## License

This project is open-source and available under the [MIT License](LICENSE).
