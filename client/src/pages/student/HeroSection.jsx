import React from 'react';
import { Button } from '@/components/ui/Button';

const HeroSection = () => {
    return (
        <div className="relative bg-gradient-to-r from-blue-500 to bg-indigo-600 dark:from-gray-800 dark:to-gray-900 py-24 px-4 text-center">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-white text-4xl font-bold mb-4">
                    Find the Best Courses for Your career
                </h1>
                <p className="text-gray-200 dark:text-gray-400 mb-8">
                    Discover,Learn and Upgrade your profile
                </p>
                <form
                    action=""
                    className="flex items-center outline-none  bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6"
                >
                    <input
                        type="text"
                        placeholder="Search for courses..."
                        className="w-full px-4 py-2 focus:border-none focus:outline-none"
                    />
                    <Button className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-r-full hover:bg-blue-700">
                        Search
                    </Button>
                </form>
                <Button className="bg-white dark:bg-gray-800 text-blue-600 rounded-full hover:bg-gray-200 cursor-pointer">
                    Explore Courese
                </Button>
            </div>
        </div>
    );
};

export default HeroSection;
