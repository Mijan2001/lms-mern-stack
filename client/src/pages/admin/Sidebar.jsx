import { ChartNoAxesColumn, SquareLibrary } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';
import React from 'react';

const Sidebar = () => {
    return (
        <div className="flex">
            <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-gray-300 dark:border-gray-700 p-5 sticky top-0 h-screen">
                <div className="space-y-8">
                    <Link
                        to="/admin/dashboard"
                        className="flex items-center gap-2"
                    >
                        <ChartNoAxesColumn size={22} />
                        <h1>Dashboard</h1>
                    </Link>
                    <Link
                        to="/admin/course"
                        className="flex items-center gap-2"
                    >
                        <SquareLibrary size={22} />
                        <h1>Courses</h1>
                    </Link>
                </div>
            </div>
            <div className="flex-1 mt-4 md:p-4 p-2">
                <Outlet />
            </div>
        </div>
    );
};

export default Sidebar;
