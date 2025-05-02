import { Edit } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Lecture = ({ lecture, index, courseId }) => {
    const navigate = useNavigate();
    const goToUpdateLecture = () => {
        navigate(`/admin/course/${courseId}/lecture/${lecture?._id}`);
    };
    return (
        <div className="flex items-center justify-between mb-5">
            <h1 className="font-bold text-md">
                Lecture - {index + 1} : {lecture?.lectureTitle}
            </h1>
            <Edit
                onClick={goToUpdateLecture}
                className="cursor-pointer text-blue-500 hover:text-blue-500"
            />
        </div>
    );
};

export default Lecture;
