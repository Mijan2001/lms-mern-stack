import React from 'react';
import { BadgeInfo, PlayCircle, Lock } from 'lucide-react';
import {
    Card,
    CardHeader,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle
} from '@/components/ui/Card';
import { Separator } from '@/components/ui/Separator';
import BuyCourseButton from '../../components/BuyCourseButton';

const CourseDetail = () => {
    const purchasedCourse = false;
    return (
        <div className="mt-20 space-y-5">
            <div className="text-white">
                <div className="max-w-7xl mx-auto py-8 md:px-8 flex flex-col gap-2">
                    <h1 className="font-bold text-2xl md:text-3xl">
                        Course Title
                    </h1>
                    <p className="text-base md:text-lg">Course Sub Title</p>
                    <p>
                        Created By{' '}
                        <span className="underline italic">Mijanur Rahman</span>{' '}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                        <BadgeInfo />
                        <p>Last Updated 02-05-2025</p>
                    </div>
                    <p>Student Enrolled : 10</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto my-5 md:px-8 flex flex-col lg:flex-row justify-between gap-5">
                <div className="w-full lg:w-1/2 space-y-5">
                    <h1 className="font-bold text-xl md:text-2xl ">
                        Description
                    </h1>
                    <p className="text-sm md:text-base">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Necessitatibus eveniet, praesentium unde, quia
                        nisi, ratione corrupti sint quae fugit laborum numquam?
                        Aliquam quo illum ipsum illo pariatur quidem eius
                        similique beatae quisquam necessitatibus explicabo
                        reprehenderit accusamus, soluta porro voluptatem error
                        ullam vel voluptate praesentium, aut mollitia. Veniam a
                        officia totam?
                    </p>
                    <Card>
                        <CardHeader>
                            <CardTitle>Course Content</CardTitle>
                            <CardDescription>4 Lectures</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {[1, 2, 3, 4].map((_, idx) => (
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
                                    <p>Lecture Title</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
                <div className="w-full lg:w-1/3">
                    <Card>
                        <CardContent className="p-4 flex flex-col">
                            <div className="w-full aspect-video mb-4">
                                Video Play
                            </div>
                            <h1>Lecture Title</h1>
                            <Separator className="my-2" />
                            <h1 className="text-lg md:text-xl font-semibold">
                                Course Price
                            </h1>
                        </CardContent>
                        <CardFooter className="flex justify-center ">
                            {purchasedCourse ? (
                                <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200">
                                    Continue Course
                                </button>
                            ) : (
                                <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                                    <BuyCourseButton />
                                </button>
                            )}
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;
