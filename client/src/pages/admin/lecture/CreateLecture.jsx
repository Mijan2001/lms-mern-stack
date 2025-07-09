import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate, useParams } from 'react-router-dom';
import {
    useCreateLectureMutation,
    useGetCourseLectureQuery
} from '../../../features/api/courseApi';
import { toast } from 'sonner';
import Lecture from './Lecture';

const CreateLecture = () => {
    const navigate = useNavigate();
    const params = useParams();
    const courseId = params.courseId;
    console.log('CreateLecture.jsx courseId===', courseId);
    // const isLoading = false;
    const [lectureTitle, setLectureTitle] = useState('');

    const [createLecture, { data, isLoading, isSuccess, error }] =
        useCreateLectureMutation();
    const {
        data: lectureData,
        isLoading: lectureLoading,
        isError: lectureError,
        refetch
    } = useGetCourseLectureQuery(courseId);

    console.log('CreateLecture.jsx lectureData===', lectureData);

    useEffect(() => {
        refetch();
        if (isSuccess) {
            toast.success(data?.message || 'Lecture created successfully!');
        }
        if (error) {
            toast.error(error?.data?.message || 'Failed to create lecture!');
        }
    }, [isSuccess, error, data?.message, refetch]);
    const createLectureHandler = async () => {
        await createLecture({ lectureTitle, courseId });
    };
    return (
        <div className="flex-1 mx-10 ">
            <div className="mb-10">
                <h1 className="font-bold text-xl">
                    Lets add lectures,add some basic lectures details for your
                    career
                </h1>
                <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Veniam, ipsum.
                </p>
            </div>
            <div className="space-y-8">
                <div className="flex flex-col gap-4">
                    <Label>Title</Label>
                    <Input
                        type="text"
                        name="courseTitle"
                        value={lectureTitle}
                        onChange={e => setLectureTitle(e.target.value)}
                        placeholder="Your Lecture Name"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => navigate(`/admin/course/${courseId}`)}
                    >
                        Back to Course
                    </Button>
                    <Button
                        onClick={createLectureHandler}
                        className="cursor-pointer"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2
                                    className="animate-spin mr-2 h-4 w-4"
                                    size={14}
                                />
                                Please wait...
                            </>
                        ) : (
                            'Create Lecture'
                        )}
                    </Button>
                </div>
                <div className="mt-10">
                    {lectureLoading ? (
                        <p>Loading Lectures</p>
                    ) : lectureError ? (
                        <p>Failed to load lectures</p>
                    ) : lectureData.lectures.length === 0 ? (
                        <p>No lecture available</p>
                    ) : (
                        lectureData?.lectures.map((lecture, index) => (
                            <Lecture
                                key={lecture?._id}
                                lecture={lecture}
                                index={index}
                                courseId={courseId}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateLecture;
