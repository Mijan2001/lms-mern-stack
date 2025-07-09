import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
    try {
        const token =
            req.cookies?.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                message: 'User not authenticated',
                success: false
            });
        }

        console.log('token form isAuthenticated middleware: ', token);

        const decode = await jwt.verify(token, process.env.SECRET_KEY);

        console.log('Decoded token in isAuthenticated middleware: ', decode);

        if (!decode) {
            return res.status(401).json({
                message: 'Invalid token',
                success: false
            });
        }

        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export default isAuthenticated;
