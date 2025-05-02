import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { useCreateCourseMutation } from '../../../features/api/courseApi';
import { toast } from 'sonner';

const AddCourse = () => {
    const navigate = useNavigate();

    const [courseTitle, setCourseTitle] = useState('');
    const [category, setCategory] = useState('');

    const [createCourse, { data, isLoading, error, isSuccess }] =
        useCreateCourseMutation();

    const getSelectedCategory = value => {
        setCategory(value);
    };

    const createCourseHandler = async () => {
        await createCourse({ courseTitle, category });
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || 'Course created successfully!');
            navigate('/admin/course');
        }
    }, [isSuccess, error]);

    return (
        <div className="flex-1 mx-10 ">
            <div className="mb-10">
                <h1 className="font-bold text-xl">
                    Lets add course,add some basic course details for your
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
                        value={courseTitle}
                        onChange={e => setCourseTitle(e.target.value)}
                        placeholder="Your Course Name"
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <Label>Category</Label>
                    <Select onValueChange={getSelectedCategory}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Category</SelectLabel>
                                <SelectItem value="Next JS">Next JS</SelectItem>
                                <SelectItem value="Data Science">
                                    Data Science
                                </SelectItem>
                                <SelectItem value="Frontend Development">
                                    Frontend Development
                                </SelectItem>
                                <SelectItem value="FullStack Development">
                                    FullStack Development
                                </SelectItem>
                                <SelectItem value="MERN Stack Development">
                                    MERN Stack Development
                                </SelectItem>
                                <SelectItem value="Ja">JavaScript</SelectItem>
                                <SelectItem value="Python">Python</SelectItem>
                                <SelectItem value="Docker">Docker</SelectItem>
                                <SelectItem value="MongoDB">MongoDB</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => navigate('/admin/course')}
                    >
                        Back
                    </Button>
                    <Button
                        onClick={createCourseHandler}
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
                            'Create'
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddCourse;
