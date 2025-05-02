import express from 'express';
import upload from '../utils/multer.js';
import { uploadMedia } from '../utils/cloudinary.js';

const router = express.Router();

// @desc Upload Video
// @route POST /upload-video
// @access Private
router.route('/upload-video').post(upload.single('file'), async (req, res) => {
    try {
        const result = await uploadMedia(req.file.path);
        if (!result) {
            return res.status(400).json({
                message: 'Failed to upload video'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Video uploaded successfully',
            data: result
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to upload video'
        });
    }
});

export default router;
