import React from 'react';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import HeroSection from './pages/student/HeroSection';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Courses from './pages/student/Courses';
import MyLearning from './pages/student/MyLearning';
import Profile from './pages/student/Profile';
import AddCourse from './pages/admin/course/AddCourse';
import Sidebar from './pages/admin/Sidebar';

const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: (
                    <>
                        <HeroSection />
                        {/* courses========== */}
                        <Courses />
                    </>
                )
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'my-learning',
                element: <MyLearning />
            },
            {
                path: 'profile',
                element: <Profile />
            },
            // Admin routes start from here=============
            {
                path: 'admin',
                element: <Sidebar />
            }
        ]
    }
]);

const App = () => {
    return (
        <main>
            <RouterProvider router={appRouter} />
        </main>
    );
};

export default App;
