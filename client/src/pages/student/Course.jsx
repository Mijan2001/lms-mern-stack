import React from 'react';
import { HiCurrencyBangladeshi } from 'react-icons/hi';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const Course = () => {
    return (
        <Card className="overflow-hidden pt-0 rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative">
            {/* Image on top of the card */}
            <div className="relative">
                <img
                    src="https://cdn.pixabay.com/photo/2018/08/04/11/30/draw-3583548_1280.png"
                    alt="course"
                    className="w-full h-36 object-cover"
                />
            </div>

            <CardContent className="mt-2 px-2 space-y-2">
                <h1 className="hover:underline font-bold text-lg truncate">
                    Nextjs Course for Beginner for advanced features
                </h1>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                            <AvatarImage
                                src="https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg"
                                alt="avatar"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <h1 className="font-medium text-xs">Mijanur Rahman</h1>
                    </div>
                    <Badge
                        className={
                            'bg-blue-600 text-white px-2 py-1 text-xs rounded-full'
                        }
                    >
                        Advance
                    </Badge>
                </div>
                <div>
                    <span className="text-sm text-gray-500 flex items-center justify-start dark:text-gray-100 space-x-4 font-bold">
                        <HiCurrencyBangladeshi className="mr-2 text-bold text-xl" />{' '}
                        5000
                    </span>
                </div>
            </CardContent>
        </Card>
    );
};

export default Course;
