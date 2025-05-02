import { AlignJustify, School } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DarkMode from '../DarkMode';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { useLogoutUserMutation } from '../features/api/authApi';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);

    const navigate = useNavigate();
    const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();

    const handleLogout = async () => {
        await logoutUser();
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || 'Logout successful');
            navigate('/login');
        }
    }, [isSuccess]);

    return (
        <nav className=" py-4 dark:bg-[#0A0A0A] bg-white border-b dark:border-gray-800 w-full ">
            {/* desktop========= */}
            <div className="max-w-7xl mx-auto hidden md:flex items-center justify-between gap-4 px-16 ">
                <div className="flex items-center gap-2 cursor-pointer">
                    <School size={'30'} />
                    <Link
                        to="/"
                        className="hidden md:block font-extrabold text-2xl"
                    >
                        E-Learning
                    </Link>
                </div>

                {/* user icons and dark mode icon==========  */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                    <AvatarImage
                                        src={
                                            user?.photoUrl ||
                                            'https://github.com/shadcn.png'
                                        }
                                        alt="@shadcn"
                                        className="cursor-pointer"
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>
                                    My Account
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <Link to="my-learning">
                                            My Learning
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link to="profile">Edit Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="cursor-pointer"
                                        onClick={handleLogout}
                                    >
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>

                                {user.role === 'instructor' && (
                                    <DropdownMenuItem className="cursor-pointer">
                                        Dashboard
                                    </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                className="cursor-pointer"
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </Button>
                            {/* <Button
                                variant="primary"
                                className="cursor-pointer"
                                onClick={() => navigate('/login')}
                            >
                                Sign Up
                            </Button> */}
                        </div>
                    )}
                    {/* dark mode icon=========== */}
                    <DarkMode />
                </div>
            </div>

            {/* mobile view=========== */}
            <div className="flex md:hidden items-center justify-between px-4 h-full">
                <h1 className="font-extrabold text-2xl">E-Learning</h1>
                <MobileNavbar />
            </div>
        </nav>
    );
};

export default Navbar;

const MobileNavbar = () => {
    const role = 'instructor';
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    size="icon"
                    className="rounded-full bg-gray-200 hover:bg-gray-300"
                    variant="outline"
                >
                    <AlignJustify />
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader className="flex flex-row items-center justify-between mt-6">
                    <SheetTitle>E-Learning</SheetTitle>
                    <DarkMode />
                </SheetHeader>
                <Separator className="mr-2" />
                <nav className="flex flex-col space-y-4 p-4">
                    <span>My Learning</span>
                    <span>Edit Profile</span>
                    <p>Log out</p>
                </nav>
                {role === 'instructor' && (
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit">Dashboard</Button>
                        </SheetClose>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    );
};
