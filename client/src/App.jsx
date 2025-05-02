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
import Dashboard from './pages/admin/Dashboard';
import CourseTable from './pages/admin/course/CourseTable';
import EditCourse from './pages/admin/course/EditCourse';
import CreateLecture from './pages/admin/lecture/CreateLecture';
import EditLecture from './pages/admin/lecture/EditLecture';
import CourseDetail from './pages/student/CourseDetail';

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
            {
                path: 'course-detail/:courseId',
                element: <CourseDetail />
            },
            // Admin routes start from here=============
            {
                path: 'admin',
                element: <Sidebar />,
                children: [
                    {
                        path: 'dashboard',
                        element: <Dashboard />
                    },
                    {
                        path: 'course',
                        element: <CourseTable />
                    },

                    {
                        path: 'course/create',
                        element: <AddCourse />
                    },
                    {
                        path: 'course/:courseId/lecture',
                        element: <CreateLecture />
                    },
                    {
                        path: 'course/:courseId/lecture/:lectureId',
                        element: <EditLecture />
                    },
                    {
                        path: 'course/:courseId',
                        element: <EditCourse />
                    }
                ]
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
