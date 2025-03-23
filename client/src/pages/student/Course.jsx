import React from 'react';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
const Course = () => {
    return (
        <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="relative">
                <img
                    src="https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png"
                    alt="course"
                    className="w-full h-36 object-cover rounded-t-lg"
                />
            </div>

            <CardContent>
                <h1 className="hover:underline font-bold text-lg truncate">
                    Nextjs Course for Beginner for advanced featurtes
                </h1>
            </CardContent>

            <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Deploy</Button>
            </CardFooter>
        </Card>
    );
};

export default Course;
