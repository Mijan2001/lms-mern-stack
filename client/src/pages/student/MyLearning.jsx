import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';
import Course from './Course';

const MyLearning = () => {
    const isLoading = false;
    const myLearningCourses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
        <div className="max-w-4xl mx-auto mt-24  px-4 md:px-0">
            <h1 className="font-bold text-2xl">My Learning</h1>
            <div className="my-5">
                {isLoading ? (
                    <MyLearningSkeleton />
                ) : myLearningCourses.length === 0 ? (
                    <p>You are not enrolled in any course</p>
                ) : (
                    <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5].map((course, index) => (
                            <Course key={index} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyLearning;

const MyLearningSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, index) => (
                <div
                    key={index}
                    className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
                ></div>
            ))}
        </div>
    );
};
