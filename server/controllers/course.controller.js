import { Course } from '../models/course.model.js';
import { Lecture } from '../models/lecture.model.js';
import {
    deleteMediaFromCloudinary,
    deleteVideoFromCloudinary,
    uploadMedia
} from '../utils/cloudinary.js';

// create new course=============
export const createCourse = async (req, res) => {
    try {
        const { courseTitle, category } = req.body;
        if (!courseTitle || !category) {
            return res.status(400).json({
                message: 'Course title and category is required.'
            });
        }

        const course = await Course.create({
            courseTitle,
            category,
            creator: req.id
        });

        return res.status(201).json({
            course,
            message: 'Course created.'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to create course'
        });
    }
};

// Get All Published Courses==================
// @desc Get all published courses
// @route GET /course
// @access Public
export const getPublishedCourse = async (_, res) => {
    try {
        const courses = await Course.find({ isPublished: true }).populate({
            path: 'creator',
            select: 'name photoUrl'
        });

        if (!courses) {
            return res.status(404).json({
                courses: [],
                message: 'No courses found.'
            });
        }
        return res.status(200).json({
            courses
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to get published courses'
        });
    }
};

// get creator all courses=================
export const getCreatorCourses = async (req, res) => {
    try {
        const userId = req.id;
        const courses = await Course.find({ creator: userId });
        if (!courses) {
            return res.status(404).json({
                courses: [],
                message: 'No courses found.'
            });
        }
        return res.status(200).json({
            courses
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to create courses'
        });
    }
};

// course edit functionality=====================
// @desc Edit course
// @route PUT /course/:courseId
// @access Public
export const editCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        console.log('course.controller.js courseId==', courseId);
        const {
            courseTitle,
            subTitle,
            description,
            category,
            courseLevel,
            coursePrice
        } = req.body;
        const thumbnail = req.file;
        let course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                message: 'Course not found.'
            });
        }

        let courseThumbnail;
        if (thumbnail) {
            if (course.courseThumbnail) {
                const publicId = course.courseThumbnail
                    .split('/')
                    .pop()
                    .split('.')[0];
                // delete old image from cloudinary==========
                await deleteMediaFromCloudinary(publicId);
            }
            courseThumbnail = await uploadMedia(thumbnail.path);
        }

        const updateData = {
            courseTitle,
            subTitle,
            description,
            category,
            courseLevel,
            coursePrice,
            courseThumbnail: courseThumbnail
                ? courseThumbnail.secure_url
                : course.courseThumbnail
        };
        console.log('course.controller.js updatedData==', updateData);
        course = await Course.findByIdAndUpdate(courseId, updateData, {
            new: true
        });

        return res.status(200).json({
            course,
            message: 'Course updated successfully.'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to edit course'
        });
    }
};

// Get Course by ID ===============================
// @desc Get course by ID
// @route GET /course/:courseId
// @access Public

export const getCourseById = async (req, res) => {
    try {
        const { courseId } = req.params;
        console.log('course.controller.js courseId======', courseId);
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                message: 'Course not found.'
            });
        }

        return res.status(200).json({
            course,
            message: 'Course fetched successfully.'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to get course by id'
        });
    }
};

// course search functionality=====================

export const searchCourse = async (req, res) => {
    try {
        const { query = '', categories = [], sortByPrice = '' } = req.query;
        console.log(categories);

        // create search query
        const searchCriteria = {
            isPublished: true,
            $or: [
                { courseTitle: { $regex: query, $options: 'i' } },
                { subTitle: { $regex: query, $options: 'i' } },
                { category: { $regex: query, $options: 'i' } }
            ]
        };

        // if categories selected
        if (categories.length > 0) {
            searchCriteria.category = { $in: categories };
        }

        // define sorting order
        const sortOptions = {};
        if (sortByPrice === 'low') {
            sortOptions.coursePrice = 1; //sort by price in ascending
        } else if (sortByPrice === 'high') {
            sortOptions.coursePrice = -1; // descending
        }

        let courses = await Course.find(searchCriteria)
            .populate({ path: 'creator', select: 'name photoUrl' })
            .sort(sortOptions);

        return res.status(200).json({
            success: true,
            courses: courses || []
        });
    } catch (error) {
        console.log(error);
    }
};

// Create Lecture=================
// @desc Create lecture
// @route POST /course/:courseId/lecture
// @access Private
export const createLecture = async (req, res) => {
    try {
        const { lectureTitle } = req.body;
        const { courseId } = req.params;

        console.log('course.controller.js courseId=', courseId);
        console.log('course.controller.js lectureTitle==', lectureTitle);

        if (!lectureTitle || !courseId) {
            return res.status(400).json({
                message: 'Lecture title and courseId is required.'
            });
        }

        // create lecture =============
        const lecture = await Lecture.create({ lectureTitle });
        const course = await Course.findById(courseId);
        console.log('course.controller.js course==', course);
        console.log('course.controller.js lecture==', lecture);

        if (course) {
            course.lectures.push(lecture?._id);
            await course.save();
        }

        return res.status(201).json({
            lecture,
            message: 'Lecture created successfully.'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to create lecture'
        });
    }
};

// Get Course Lecture=================
// @desc Get Course lecture
// @route GET /course/:courseId/lecture
// @access Private
export const getCourseLecture = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId).populate('lectures');
        if (!course) {
            return res.status(404).json({
                message: 'Course not found.'
            });
        }
        return res.status(200).json({
            lectures: course.lectures
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to get course lecture'
        });
    }
};

// Edit Lecture=================
// @desc Edit lecture
// @route PUT /course/:courseId/lecture/:lectureId
// @access Private
export const editLecture = async (req, res) => {
    try {
        const { lectureTitle, videoInfo, isPreviewFree } = req.body;
        const { courseId, lectureId } = req.params;
        const lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(404).json({
                message: 'Lecture not found.'
            });
        }

        // update lecture ==========
        if (lectureTitle) lecture.lectureTitle = lectureTitle;
        if (videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
        if (videoInfo?.publicId) lecture.isPreviewFree = isPreviewFree;
        lecture.isPreviewFree = isPreviewFree;

        await lecture.save();

        // Ensure the course is still has the lecture id if it was not already added.
        const course = await Course.findById(courseId);
        if (course && !course.lectures.includes(lecture._id)) {
            course.lectures.push(lecture._id);
            await course.save();
        }

        return res.status(200).json({
            lecture,
            message: 'Lecture updated successfully.'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to edit lecture'
        });
    }
};

// Remove Lecture=================
// @desc Remove lecture
// @route POST /course/:courseId/lecture/:lectureId
// @access Private
export const removeLecture = async (req, res) => {
    try {
        const { lectureId } = req.params;
        const lecture = await Lecture.findByIdAndDelete(lectureId);
        if (!lecture) {
            return res.status(404).json({
                message: 'Lecture not found.'
            });
        }

        // delete video lecture from cloudinary
        if (lecture.publicId) {
            await deleteVideoFromCloudinary(lecture.publicId);
        }

        // remove the lecture reference from the associated course
        await Course.updateOne(
            { lectures: lectureId },
            { $pull: { lectures: lectureId } }
        );

        return res.status(200).json({
            message: 'Lecture removed successfully.'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to remove lecture'
        });
    }
};

// Get Lecture by id=================
// @desc Get lecture ny id
// @route GET /course/:courseId/lecture/:lectureId
// @access Private
export const getLectureById = async (req, res) => {
    try {
        const { lectureId } = req.params;
        const lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(404).json({
                message: 'Lecture not found.'
            });
        }
        return res.status(200).json({
            lecture
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to get lecture by id'
        });
    }
};

// publish unpublish course login========================
// @desc publish unpublish course
// @route PUT /:courseId
// @access Private
export const togglePublishCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { publish } = req.query;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                message: 'Course not found.'
            });
        }
        // publish status based on the query parameter
        course.isPublished = publish === 'true';
        await course.save();

        const statusMessage = course.isPublished ? 'Published' : 'Unpublished';
        return res.status(200).json({
            message: `Course ${statusMessage} successfully.`
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to toggle publish course'
        });
    }
};
