import React from 'react';
import ReactPlayer from 'react-player/lazy';
import { BadgeInfo, PlayCircle, Lock, Loader2 } from 'lucide-react';
import {
    Card,
    CardHeader,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import BuyCourseButton from '../../components/BuyCourseButton';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetCourseDetailWithStatusQuery } from '../../features/api/purchaseApi';

const CourseDetail = () => {
    const params = useParams();
    const courseId = params.courseId;
    const navigate = useNavigate();
    const { data, isLoading, isSuccess, isError, error } =
        useGetCourseDetailWithStatusQuery(courseId);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">Error: {error?.message}</p>
            </div>
        );
    }

    const { course, purchased } = data;
    console.log('courseDetail', course, purchased);

    const handleContinueCourse = () => {
        if (purchased) {
            navigate(`/course-progress/${courseId}`);
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="mt-20 p-2 space-y-5">
            <div className="text-white">
                <div className="max-w-7xl mx-auto py-8 md:px-8 flex flex-col gap-2">
                    <h1 className="font-bold text-2xl md:text-3xl">
                        {course?.courseTitle}
                    </h1>
                    <p className="text-base md:text-lg">{course?.subTitle}</p>
                    <p>
                        Created By{' '}
                        <span className="underline italic">
                            {course?.creator.name}
                        </span>{' '}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                        <BadgeInfo />
                        <p>Last Updated : {course?.createdAt.split('T')[0]} </p>
                    </div>
                    <p>Student Enrolled : {course?.enrolledStudents.length} </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto my-5 md:px-8 flex flex-col lg:flex-row justify-between gap-5">
                <div className="w-full lg:w-1/2 space-y-5">
                    <h1 className="font-bold text-xl md:text-2xl ">
                        Description
                    </h1>
                    <p
                        className="text-sm md:text-base"
                        dangerouslySetInnerHTML={{
                            __html: course?.description
                        }}
                    />

                    <Card>
                        <CardHeader>
                            <CardTitle>Course Content</CardTitle>
                            <CardDescription>
                                {course?.lectures.length} Lectures
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {course?.lectures.map((lecture, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-3  text-sm"
                                >
                                    <span>
                                        {true ? (
                                            <PlayCircle size={14} />
                                        ) : (
                                            <Lock size={14} />
                                        )}
                                    </span>
                                    <p>{lecture?.lectureTitle}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
                <div className="w-full lg:w-1/3">
                    <Card>
                        <CardContent className="p-4 flex flex-col">
                            <div className="w-full aspect-video mb-4">
                                <ReactPlayer
                                    url={course?.lectures[0]?.videoUrl}
                                    width="100%"
                                    height="100%"
                                    controls={true}
                                    light={true}
                                    className="rounded-md"
                                />
                            </div>
                            <h1>Lecture Title</h1>
                            <Separator className="my-2" />
                            {!purchased && (
                                <h1 className="text-lg md:text-xl font-semibold">
                                    Course Price {course?.coursePrice} BDT
                                </h1>
                            )}
                        </CardContent>
                        <CardFooter className="flex justify-center ">
                            {purchased ? (
                                <button
                                    onClick={handleContinueCourse}
                                    className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
                                >
                                    Continue Course
                                </button>
                            ) : (
                                <BuyCourseButton courseId={courseId} />
                            )}
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;
