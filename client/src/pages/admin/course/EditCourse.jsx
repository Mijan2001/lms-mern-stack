import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CourseTab from './CourseTab';

const EditCourse = () => {
    return (
        <div className="flex-1">
            <div className="flex items-center justify-between mb-5">
                <h1 className="font-bold text-xl">
                    Add detail information regarding to the course
                </h1>
                <Link to="lecture">
                    <Button
                        variant="link"
                        className="cursor-pointer text-blue-500 underline hover:text-blue-500"
                    >
                        Go to lectures page
                    </Button>
                </Link>
            </div>
            <CourseTab />
        </div>
    );
};

export default EditCourse;
