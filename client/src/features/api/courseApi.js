import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const COURSE_API = 'http://localhost:8080/api/v1/course';

export const courseApi = createApi({
    reducerPath: 'courseApi',
    tagTypes: ['Refetch_Creator_Course', 'Refetch_Lecture'],
    baseQuery: fetchBaseQuery({
        baseUrl: COURSE_API,
        credentials: 'include'
    }),
    endpoints: builder => ({
        createCourse: builder.mutation({
            query: ({ courseTitle, category }) => {
                if (!courseTitle || !category) {
                    throw new Error('Course title and category are required.');
                }

                return {
                    url: '',
                    method: 'POST',
                    body: { courseTitle, category }
                };
            },
            invalidatesTags: ['Refetch_Creator_Course']
        }),
        getPublishedCourse: builder.query({
            query: () => {
                return {
                    url: '/published-courses',
                    method: 'GET'
                };
            }
        }),
        getCreatorCourse: builder.query({
            query: () => {
                return {
                    url: '',
                    method: 'GET'
                };
            },
            providesTags: ['Refetch_Creator_Course']
        }),
        editCourse: builder.mutation({
            query: ({ formData, courseId }) => {
                console.log(
                    'courseApi.js formdData, courseId===',
                    formData,
                    courseId
                );
                return {
                    url: `/${courseId}`,
                    method: 'PUT',
                    body: formData
                };
            },
            invalidatesTags: ['Refetch_Creator_Course']
        }),
        getCourseById: builder.query({
            query: courseId => {
                return {
                    url: `/${courseId}`,
                    method: 'GET'
                };
            }
        }),
        createLecture: builder.mutation({
            query: ({ lectureTitle, courseId }) => {
                return {
                    url: `/${courseId}/lecture`,
                    method: 'POST',
                    body: { lectureTitle }
                };
            }
        }),
        getCourseLecture: builder.query({
            query: courseId => {
                return {
                    url: `/${courseId}/lecture`,
                    method: 'GET'
                };
            },
            providesTags: ['Refetch_Lecture']
        }),
        editLecture: builder.mutation({
            query: ({
                lectureTitle,
                videoInfo,
                isPreviewFree,
                courseId,
                lectureId
            }) => {
                return {
                    url: `/${courseId}/lecture/${lectureId}`,
                    method: 'POST',
                    body: { lectureTitle, videoInfo, isPreviewFree }
                };
            }
        }),
        removeLecture: builder.mutation({
            query: lectureId => {
                return {
                    url: `/lecture/${lectureId}`,
                    method: 'DELETE'
                };
            },
            invalidatesTags: ['Refetch_Lecture']
        }),
        getLectureById: builder.query({
            query: lectureId => {
                return {
                    url: `/lecture/${lectureId}`,
                    method: 'GET'
                };
            }
        }),
        publishCourse: builder.mutation({
            query: ({ courseId, query }) => {
                return {
                    url: `/${courseId}?publish=${query}`,
                    method: 'PATCH'
                };
            }
            // invalidatesTags: ['Refetch_Creator_Course']
        })
    })
});

export const {
    useCreateCourseMutation,
    useGetPublishedCourseQuery,
    useGetCreatorCourseQuery,
    useEditCourseMutation,
    useGetCourseByIdQuery,
    useCreateLectureMutation,
    useGetCourseLectureQuery,
    useEditLectureMutation,
    useRemoveLectureMutation,
    useGetLectureByIdQuery,
    usePublishCourseMutation
} = courseApi;
