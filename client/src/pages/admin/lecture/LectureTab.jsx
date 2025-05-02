import React, { useEffect, useState } from 'react';
import {
    CardDescription,
    CardHeader,
    Card,
    CardTitle,
    CardContent
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import axios from 'axios';
import { toast } from 'sonner';
import {
    useEditLectureMutation,
    useGetLectureByIdQuery,
    useRemoveLectureMutation
} from '../../../features/api/courseApi';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const MEDIA_API = 'http://localhost:8080/api/v1/media';

const LectureTab = () => {
    const navigate = useNavigate();
    const [lectureTitle, setLectureTitle] = useState('');
    const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
    const [isFree, setIsFree] = useState(false);
    const [mediaProgress, setMediaProgress] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [btnDisable, setBtnDisable] = useState(true);
    const params = useParams();
    const { courseId, lectureId } = params;

    const { data: lectureData } = useGetLectureByIdQuery(lectureId);
    const lecture = lectureData?.lecture;

    useEffect(() => {
        if (lecture) {
            setLectureTitle(lecture?.lectureTitle);
            setUploadVideoInfo(lecture?.videoInfo);
            setIsFree(lecture?.isPreviewFree);
        }
    }, [lecture]);

    const [editLecture, { data, isLoading, error, isSuccess }] =
        useEditLectureMutation();
    const [
        removeLecture,
        { data: removeData, isLoading: removeLoading, isSuccess: removeSuccess }
    ] = useRemoveLectureMutation();

    const fileChangeHandler = async e => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            setMediaProgress(true);

            try {
                const res = await axios.post(
                    `${MEDIA_API}/upload-video`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        onUploadProgress: ({ loaded, total }) => {
                            setUploadProgress(Math.round(loaded * 100 * total));
                        }
                    }
                );
                if (res.data.success) {
                    console.log('LectureTab.jsx res=== ', res);
                    setUploadVideoInfo({
                        videoUrl: res.data.data.url,
                        publicId: res.data.data.public_id
                    });
                    setBtnDisable(false);
                    toast.success(
                        res.data.message || 'Video uploaded successfully!'
                    );
                }
            } catch (error) {
                console.error('Error uploading file:', error);
                toast.error(
                    error?.response?.data?.message || 'Failed to upload video!'
                );
            } finally {
                setMediaProgress(false);
            }
        }
    };

    const editLectureHandler = async () => {
        await editLecture({
            lectureTitle,
            videoInfo: uploadVideoInfo,
            isPreviewFree: isFree,
            courseId,
            lectureId
        });
    };

    const removeLectureHandler = async () => {
        await removeLecture(lectureId);
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || 'Lecture updated successfully!');
            setLectureTitle('');
            setUploadVideoInfo(null);
            setBtnDisable(true);
            setUploadProgress(0);
            setMediaProgress(false);
        }
        if (error) {
            toast.error(error?.data?.message || 'Failed to update lecture!');
        }
    }, [isSuccess, error]);

    useEffect(() => {
        if (removeSuccess) {
            toast.success(
                removeData.message || 'Lecture removed successfully!'
            );
            setLectureTitle('');
            setUploadVideoInfo(null);
            setBtnDisable(true);
            setUploadProgress(0);
            setMediaProgress(false);

            navigate(-1);
        }
        if (removeLoading) {
            toast.error('Failed to remove lecture!');
        }
    }, [removeSuccess]);

    return (
        <Card>
            <CardHeader className="flex items-center justify-between">
                <div>
                    <CardTitle>
                        <CardDescription>
                            Make changes and click save when done
                        </CardDescription>
                    </CardTitle>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        disabled={removeLoading}
                        onClick={removeLectureHandler}
                        variant="destructive"
                        className="cursor-pointer"
                    >
                        {removeLoading ? (
                            <>
                                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                Please wait...
                            </>
                        ) : (
                            'Remove Lecture'
                        )}
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="space-y-4">
                    <Label>Title</Label>
                    <Input
                        type="text"
                        name="lectureTitle"
                        value={lectureTitle}
                        onChange={e => setLectureTitle(e.target.value)}
                        placeholder="Enter lecture title"
                        className="w-full"
                    />
                </div>
                <div className="space-y-4">
                    <Label>
                        Video <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        type="file"
                        accept="video/*"
                        name="videoTitle"
                        onChange={fileChangeHandler}
                        placeholder="Enter lecture title"
                        className="w-full"
                    />
                </div>
                {mediaProgress && (
                    <div className="space-y-4 ">
                        <Progress value={uploadProgress} />
                        <p>{uploadProgress}% uploaded</p>
                    </div>
                )}
                <div className="flex items-center space-x-2">
                    <Switch
                        checked={isFree}
                        onCheckedChange={setIsFree}
                        id="airplane-mode"
                    />
                    <Label htmlFor="airplane-mode">Is this lecture free?</Label>
                </div>

                <div className="space-y-4">
                    <Button disabled={isLoading} onClick={editLectureHandler}>
                        {isLoading ? (
                            <>
                                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                Please wait...
                            </>
                        ) : (
                            'Update Lecture'
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default LectureTab;
