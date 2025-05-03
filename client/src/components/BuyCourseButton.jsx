import React, { useEffect } from 'react';
import { useCreateCheckoutSessionMutation } from '../features/api/purchaseApi';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const BuyCourseButton = ({ courseId }) => {
    const [
        createCheckoutSession,
        { data, isLoading, isSuccess, isError, error }
    ] = useCreateCheckoutSessionMutation();

    const purchaseCourseHandler = async () => {
        await createCheckoutSession(courseId)
            .unwrap()
            .then(res => {
                if (res.url) {
                    window.location.href = res.url;
                } else {
                    console.error(
                        'Failed to redirect to Stripe checkout session'
                    );
                }
            })
            .catch(err => {
                console.error('Error creating checkout session:', err);
            });
    };

    useEffect(() => {
        if (isSuccess) {
            if (data?.url) {
                window.location.href = data.url;
            } else {
                toast.error('Failed to redirect to checkout session');
            }
        }
        if (isError) {
            if (error?.status === 400) {
                toast.error('Invalid course ID or user ID');
            } else if (error?.status === 404) {
                toast.error('Course not found');
            } else if (error?.status === 500) {
                toast.error('Failed to create checkout session');
            } else {
                toast.error('An unexpected error occurred');
            }
        }
    }, [data, isSuccess, isError, error]);

    return (
        <button
            disabled={isLoading}
            className="w-full flex justify-center items-center cursor-pointer bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
            onClick={purchaseCourseHandler}
        >
            {isLoading ? (
                <>
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Please wait...
                </>
            ) : (
                'Purchase Course'
            )}
        </button>
    );
};

export default BuyCourseButton;
