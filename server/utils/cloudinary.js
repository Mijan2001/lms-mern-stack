import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// upload image or video===============
export const uploadMedia = async file => {
    try {
        const uploadResponse = await cloudinary.uploader.upload(file, {
            resource_type: 'auto'
        });
        return uploadResponse;
    } catch (error) {
        console.log('Error uploading media to cloudinary: ', error);
        throw new Error('Failed to upload media');
    }
};

// delete image from cloudinary=================
export const deleteMediaFromCloudinary = async publicId => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.log('Error deleting media from cloudinary: ', error);
        throw new Error('Failed to delete media');
    }
};

// delete video from cloudinary=================
export const deleteVideoFromCloudinary = async publicId => {
    try {
        await cloudinary.uploader.destroy(publicId, {
            resource_type: 'video'
        });
    } catch (error) {
        console.log('Error deleting video from cloudinary: ', error);
        throw new Error('Failed to delete video');
    }
};
