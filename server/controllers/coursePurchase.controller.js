import Stripe from 'stripe';
import { Course } from './../models/course.model.js';
import { CoursePurchase } from './../models/coursePurchase.model.js';
import { Lecture } from '../models/lecture.model.js';
import { User } from '../models/user.model.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
    try {
        const userId = req.id;
        const { courseId } = req.body;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Create a new course purchase record
        const newPurchase = new CoursePurchase({
            courseId,
            userId,
            amount: course.coursePrice,
            status: 'pending'
        });

        // Create a stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'BDT',
                        product_data: {
                            name: course.courseTitle,
                            images: [course.courseThumbnail]
                        },
                        unit_amount: course.coursePrice * 100 // Convert to paisa
                    },
                    quantity: 1
                }
            ],
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/course-progress/${courseId}`,
            cancel_url: `${process.env.CLIENT_URL}/course-detail/${courseId}`,
            metadata: {
                courseId: courseId,
                userId: userId
            },
            shipping_address_collection: {
                allowed_countries: ['BD']
            }
        });

        if (!session) {
            return res
                .status(500)
                .json({ error: 'Failed to create checkout session' });
        }
        // Save the purchase record to the database
        newPurchase.paymentId = session.id;
        await newPurchase.save();

        // Return the session ID to the client
        return res.status(200).json({ success: true, url: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const stripeWebhook = async (req, res) => {
    let event;

    try {
        const payloadString = JSON.stringify(req.body, null, 2);
        const secret = process.env.WEBHOOK_ENDPOINT_SECRET;

        const header = stripe.webhooks.generateTestHeaderString({
            payload: payloadString,
            secret
        });

        event = stripe.webhooks.constructEvent(payloadString, header, secret);
    } catch (error) {
        console.error('Webhook error:', error.message);
        return res.status(400).send(`Webhook error: ${error.message}`);
    }

    // Handle the checkout session completed event
    if (event.type === 'checkout.session.completed') {
        console.log('check session complete is called');

        try {
            const session = event.data.object;

            const purchase = await CoursePurchase.findOne({
                paymentId: session.id
            }).populate({ path: 'courseId' });

            if (!purchase) {
                return res.status(404).json({ message: 'Purchase not found' });
            }

            if (session.amount_total) {
                purchase.amount = session.amount_total / 100;
            }
            purchase.status = 'completed';

            // Make all lectures visible by setting `isPreviewFree` to true
            if (purchase.courseId && purchase.courseId.lectures.length > 0) {
                await Lecture.updateMany(
                    { _id: { $in: purchase.courseId.lectures } },
                    { $set: { isPreviewFree: true } }
                );
            }

            await purchase.save();

            // Update user's enrolledCourses
            await User.findByIdAndUpdate(
                purchase.userId,
                { $addToSet: { enrolledCourses: purchase.courseId._id } }, // Add course ID to enrolledCourses
                { new: true }
            );

            // Update course to add user ID to enrolledStudents
            await Course.findByIdAndUpdate(
                purchase.courseId._id,
                { $addToSet: { enrolledStudents: purchase.userId } }, // Add user ID to enrolledStudents
                { new: true }
            );
        } catch (error) {
            console.error('Error handling event:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    res.status(200).send();
};

export const getCourseDetailWithPurchaseStatus = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.id;

        console.log(
            'courseId in getCourseDetailWithPurchaseStatus: ',
            courseId
        );
        console.log('userId in getCourseDetailWithPurchaseStatus: ', userId);

        const course = await Course.findById(courseId)
            .populate({ path: 'creator' })
            .populate({ path: 'lectures' });

        const purchased = await CoursePurchase.findOne({ userId, courseId });
        console.log('purchased coursed === ', purchased);

        if (!course) {
            return res.status(404).json({ message: 'course not found!' });
        }

        return res.status(200).json({
            course,
            purchased: !!purchased // true if purchased, false otherwise
        });
    } catch (error) {
        console.log(error);
    }
};

export const getAllPurchasedCourse = async (_, res) => {
    try {
        const purchasedCourse = await CoursePurchase.find({
            status: 'completed'
        }).populate('courseId');
        if (!purchasedCourse) {
            return res.status(404).json({
                purchasedCourse: []
            });
        }
        return res.status(200).json({
            purchasedCourse
        });
    } catch (error) {
        console.log(error);
    }
};
