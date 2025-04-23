import { Loader } from 'lucide-react';
import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <Loader className="animate-spin text-blue-500 w-12 h-12" />
            <p className="mt-2 text-lg text-gray-700">Loading...</p>
        </div>
    );
};

export default LoadingSpinner;
