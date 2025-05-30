import jwt from 'jsonwebtoken';

export const generateToken = (res, user, message) => {
    const token = jwt.sign({ userId: user?._id }, process.env.SECRET_KEY, {
        expiresIn: '30d'
    });
    return res
        .status(200)
        .cookie('token', token, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 30 * 24 * 60 * 60 * 1000
        })
        .json({ success: true, message, user });
};
