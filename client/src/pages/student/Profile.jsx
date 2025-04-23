import React, { useEffect, useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import Course from './Course';
import {
    useLoadUserQuery,
    useUpdateUserMutation
} from '../../features/api/authApi';
import { toast } from 'sonner';
import LoadingSpinner from '../../components/LoadingSpinner';

const Profile = () => {
    const { data, isLoading } = useLoadUserQuery();
    const [name, setName] = useState('');
    const [profilePhoto, setProfilePhoto] = useState('');

    const [
        updateUser,
        { data: updateUserData, isLoading: updateUserLoading, error }
    ] = useUpdateUserMutation();

    if (isLoading) return <LoadingSpinner />;

    const { user } = data && data?.user;

    const enrolledCourses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const onChangeHandler = e => {
        const file = e.target.files?.[0];
        if (file) {
            setProfilePhoto(file);
        }
    };

    const updateUserHandler = async e => {
        e.preventDefault();

        console.log('update profile ==', name, profilePhoto);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 my-24">
            <h2 className="font-bold text-2xl text-center md:text-left">
                PROFILE
            </h2>
            <div className="flex flex-col md:flex-row items-center md:items-center gap-8 my-5">
                <div className="flex flex-col items-center">
                    <Avatar className="w-32 h-32 md:w-32 md:h-32 mb-4">
                        <AvatarImage
                            src={
                                user?.photoUrl ||
                                'https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg'
                            }
                            alt="avatar"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>

                <div className="flex flex-col md:items-start">
                    <div className="mb-2">
                        <h1 className="font-semibold text-gray-900 dark:text-gray-100">
                            Name :
                            <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                                {user?.name || 'User'}
                            </span>
                        </h1>
                    </div>

                    <div className="mb-2">
                        <h1 className="font-semibold text-gray-900 dark:text-gray-100">
                            Email :
                            <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                                {user?.email || 'example@gmail.com'}
                            </span>
                        </h1>
                    </div>

                    <div className="mb-2">
                        <h1 className="font-semibold text-gray-900 dark:text-gray-100">
                            Role :
                            <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                                {user?.role.toUpperCase() || 'Student'}
                            </span>
                        </h1>
                    </div>
                    <div className="mb-2">
                        <h1 className="font-semibold text-gray-900 dark:text-gray-100">
                            <DialogComponent />
                        </h1>
                    </div>
                </div>
            </div>
            <div>
                <h1 className="font-medium text-lg">
                    Courses you're enrolled in
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-5">
                    {user?.enrolledCourses.length === 0 ? (
                        <h1>You haven't enrolled yet</h1>
                    ) : (
                        user?.enrolledCourses?.map(course => (
                            <Course course={course} key={course?._id} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;

const DialogComponent = () => {
    const { data, isLoading, refetch } = useLoadUserQuery();
    const [name, setName] = useState('');
    const [profilePhoto, setProfilePhoto] = useState('');

    const [
        updateUser,
        {
            data: updateUserData,
            isLoading: updateUserLoading,
            isError,
            error,
            isSuccess
        }
    ] = useUpdateUserMutation();

    if (isLoading) return <h1>Profile Loading...</h1>;

    const { user } = data;

    const enrolledCourses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const onChangeHandler = e => {
        const file = e.target.files?.[0];
        if (file) {
            setProfilePhoto(file);
        }
    };

    const updateUserHandler = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('profilePhoto', profilePhoto);

        await updateUser(formData);
    };

    useEffect(() => {
        refetch();
    }, []);

    useEffect(() => {
        if (isSuccess) {
            refetch();
            toast.success(data?.message || 'Profile updated successfully');
        }
        if (isError) {
            toast.error(error?.message || 'Failed to update profile');
        }
    }, [error, updateUserData, isSuccess, isError]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="mb-2">
                    Edit Profile
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-left">
                            Name
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="col-span-3"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                            htmlFor="profile-photo"
                            className="text-left text-xs"
                        >
                            Profile Photo
                        </Label>
                        <Input
                            id="profile-photo"
                            type="file"
                            accept="image/*"
                            onChange={onChangeHandler}
                            placeholder="Upload your profile photo"
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="submit"
                        disabled={updateUserLoading}
                        onClick={updateUserHandler}
                    >
                        {updateUserLoading ? (
                            <>
                                <Loader2 className="animate-spin" /> Please
                                wait...
                            </>
                        ) : (
                            'Save Changes'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
