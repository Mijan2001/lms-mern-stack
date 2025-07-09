import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'; // npm install @react-oauth/google
import { jwtDecode } from 'jwt-decode'; // npm install jwt-decode
import React, { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';

const GoogleLoginAndLogout = () => {
    const [user, setUser] = useState(null);
    const [showLoginButton, setShowLoginButton] = useState(false); // Controls visibility of Google login button

    const handleSuccess = credentialResponse => {
        console.log(credentialResponse);
        const decoded = jwtDecode(credentialResponse?.credential);
        setUser(decoded);
        localStorage.setItem('user', JSON.stringify(decoded));
    };

    const handleError = error => {
        console.log('Login Failed', error);
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <GoogleOAuthProvider clientId="828134576685-k67nj919jllhi2pvhj4appeqm36qe6a5.apps.googleusercontent.com">
            {user ? (
                <div className="text-center">
                    <p className="mb-2">
                        Logged in as: {user.name || user.email}
                    </p>
                    <button
                        onClick={handleLogout}
                        className="w-full justify-center py-1 rounded-md flex items-center gap-2 bg-red-500 text-white border cursor-pointer hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            ) : !showLoginButton ? (
                <button
                    onClick={() => setShowLoginButton(true)}
                    className="w-full justify-center py-1 rounded-md flex items-center gap-2 bg-white text-black border cursor-pointer hover:bg-gray-200"
                >
                    <FcGoogle size={20} /> Login with Google
                </button>
            ) : (
                <div className="text-center">
                    <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={handleError}
                    />
                </div>
            )}
        </GoogleOAuthProvider>
    );
};

export default GoogleLoginAndLogout;
