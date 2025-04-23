import { ChartNoAxesColumn, Link, SquareLibrary } from 'lucide-react';
import React from 'react';

const Dashboard = () => {
    return (
        <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-gray-300 dark:border-gray-700 bg-[#f0f0f0] p-5 sticky top-0 h-screen">
            <div className="space-y-4">
                <Link>
                    <ChartNoAxesColumn size={22} />
                    <h1>Dashboard</h1>
                </Link>
                <Link>
                    <SquareLibrary size={22} />
                    <h1>Courses</h1>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
