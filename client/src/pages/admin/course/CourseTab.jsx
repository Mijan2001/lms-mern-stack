import React, { useEffect, useState } from 'react';
import { CardTitle, CardContent } from '@/components/ui/card';
import { CardDescription } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';

import { useNavigate, useParams } from 'react-router-dom';
// import RichTextEditor from '../../../components/RichTextEditor';
import { Loader2 } from 'lucide-react';
import {
    useEditCourseMutation,
    useGetCourseByIdQuery,
    usePublishCourseMutation
} from '../../../features/api/courseApi';
import { toast } from 'sonner';

const CourseTab = () => {
    const navigate = useNavigate();
    const [previewThumbnail, setPreviewThumbnail] = useState('');
    const params = useParams();
    const courseId = params.courseId;

    const [input, setInput] = useState({
        courseTitle: '',
        subTitle: '',
        description: '',
        category: '',
        courseLevel: '',
        coursePrice: '',
        courseThumbnail: ''
    });

    const [editCourse, { data, isLoading, isSuccess, error }] =
        useEditCourseMutation();
    const {
        data: courseByIdData,
        isLoading: courseByIdLoading,
        refetch
    } = useGetCourseByIdQuery(courseId);
    const [publishCourse] = usePublishCourseMutation();

    const course = courseByIdData?.course;

    useEffect(() => {
        if (course) {
            setInput({
                courseTitle: course.courseTitle,
                subTitle: course.subTitle,
                description: course.description,
                category: course.category,
                courseLevel: course.courseLevel,
                coursePrice: course.coursePrice,
                courseThumbnail: course.courseThumbnail
            });
            setPreviewThumbnail(course.courseThumbnail);
        }
    }, [course]);

    const changeEventHandler = e => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const selectCategory = value => {
        setInput({ ...input, category: value });
    };

    const selectCourseLevel = value => {
        setInput({ ...input, courseLevel: value });
    };

    // get file====================
    const selectThumbnail = e => {
        const file = e.target.files?.[0];

        if (file) {
            setInput({ ...input, courseThumbnail: file });
            const fileReader = new FileReader();
            fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
            fileReader.readAsDataURL(file);
        }
    };

    const updateCourseHandler = async () => {
        const formData = new FormData();
        formData.append('courseTitle', input.courseTitle);
        formData.append('subTitle', input.subTitle);
        formData.append('description', input.description);
        formData.append('category', input.category);
        formData.append('courseLevel', input.courseLevel);
        formData.append('coursePrice', input.coursePrice);
        formData.append('courseThumbnail', input.courseThumbnail);

        console.log('CourseTab.js formData===', formData);
        console.log('CourseTab.js courseId===', courseId);

        await editCourse({ formData, courseId });
    };

    const publishStatusHandler = async action => {
        try {
            const response = await publishCourse({ courseId, query: action });
            refetch();
            if (response?.data) {
                toast.success(
                    response?.data?.message || 'Course published successfully!'
                );
            }
        } catch (error) {
            toast.error(
                error?.data?.message || 'Filed to publish or unpublish course'
            );
        }
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || 'Course updated successfully!');
            navigate('/admin/course');
        }
        if (error) {
            toast.error(error?.data?.message || 'Something went wrong!');
        }
    }, [isSuccess, error]);

    if (courseByIdLoading) return <Loader2 className="animate-spin h-4 w-4" />;

    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-center">
                <div>
                    <CardTitle>Basic Course Information</CardTitle>
                    <CardDescription>
                        Make changes to your courses here. Click save when
                        you're done
                    </CardDescription>
                </div>
                <div>
                    <Button
                        onClick={() =>
                            publishStatusHandler(
                                courseByIdData?.course.isPublished
                                    ? 'false'
                                    : 'true'
                            )
                        }
                        disabled={courseByIdData?.course.length === 0}
                        variant="outline"
                        className="m-2 cursor-pointer hover:text-gray-400"
                    >
                        {courseByIdData?.course.isPublished ? (
                            <span className="text-blue-400">Unpublished</span>
                        ) : (
                            <span>Published</span>
                        )}
                    </Button>
                    <Button variant="destructive" className="cursor-pointer">
                        Remove Course
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    <div className="space-y-4">
                        <Label>Course Title</Label>
                        <Input
                            type="text"
                            name="courseTitle"
                            value={input.courseTitle}
                            onChange={changeEventHandler}
                            placeholder="Ex. FullStack Developer"
                        />
                    </div>

                    <div className="space-y-4">
                        <Label>Sub Title</Label>
                        <Input
                            type="text"
                            name="subTitle"
                            value={input.subTitle}
                            onChange={changeEventHandler}
                            placeholder="Ex. Become a FullStack Developer from zero to hero"
                        />
                    </div>

                    <div className="space-y-4">
                        <Label>Description</Label>

                        {/* ei অংশটা পরে করা হবে========= */}

                        {/* <RichTextEditor input={input} setInput={setInput} /> */}
                    </div>
                    <div className="flex items-center gap-5">
                        {/* course category===================== */}
                        <div className="space-y-4">
                            <Label>Category</Label>
                            <Select
                                onValueChange={selectCategory}
                                defaultValue={input.category}
                                value={input.category}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Category</SelectLabel>
                                        <SelectItem value="Next JS">
                                            Next JS
                                        </SelectItem>
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
                                        <SelectItem value="Ja">
                                            JavaScript
                                        </SelectItem>
                                        <SelectItem value="Python">
                                            Python
                                        </SelectItem>
                                        <SelectItem value="Docker">
                                            Docker
                                        </SelectItem>
                                        <SelectItem value="MongoDB">
                                            MongoDB
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        {/* course level===================== */}
                        <div className="space-y-4">
                            <Label>Course Level</Label>
                            <Select
                                onValueChange={selectCourseLevel}
                                defaultValue={input.courseLevel}
                                value={input.courseLevel}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a Course Level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Course Level</SelectLabel>
                                        <SelectItem value="Beginner">
                                            Beginner
                                        </SelectItem>
                                        <SelectItem value="Medium">
                                            Medium
                                        </SelectItem>
                                        <SelectItem value="Advanced">
                                            Advanced
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* course price===================== */}
                        <div className="space-y-4">
                            <Label>Course Price in BDT</Label>
                            <Input
                                type="number"
                                name="coursePrice"
                                value={input.coursePrice}
                                onChange={changeEventHandler}
                                placeholder="1000"
                                className="w-fit"
                            />
                        </div>
                    </div>
                    {/* course thumbnail===================== */}
                    <div className="flex items-center gap-5">
                        <div className="space-y-4">
                            <Label>Course Thumbnail</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                className="w-fit"
                                name="courseThumbnail"
                                // value={input.courseThumbnail} // ফাইলের ক্ষেত্রে এইটা লিখললে এররর আসবে
                                onChange={selectThumbnail}
                                placeholder="Choose a thumbnail"
                            />
                            {previewThumbnail && (
                                <img
                                    src={previewThumbnail}
                                    alt="Course Thumbnail"
                                    className="w-64  object-cover mt-2"
                                />
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-5 mt-5">
                        <Button
                            className="cursor-pointer bg-gray-300 hover:text-gray-400"
                            variant="outline"
                            onClick={() => navigate('/admin/course')}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={updateCourseHandler}
                            disabled={isLoading}
                            className="ml-2 hover:text-gray-800 hover:bg-gray-400 cursor-pointer"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 animate-spin h-4 w-4" />
                                    Please Wait...
                                </>
                            ) : (
                                <span>Save</span>
                            )}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CourseTab;
