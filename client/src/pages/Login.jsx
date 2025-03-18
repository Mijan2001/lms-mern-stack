import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import GoogleLoginAndLogout from '../utils/GoogleLogin';
import {
    useLoginUserMutation,
    useRegisterUserMutation
} from '../features/api/authApi';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // show password eye icons============
    const togglePassword = () => setShowPassword(!showPassword);

    const [signupInput, setSignupInput] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [loginInput, setLoginInput] = useState({
        email: '',
        password: ''
    });

    const [
        registerUser,
        {
            data: registerData,
            error: registerError,
            isLoading: registerIsLoading,
            isSuccess: registerIsSuccess
        }
    ] = useRegisterUserMutation();
    const [
        loginUser,
        {
            data: loginData,
            error: loginError,
            isLoading: loginIsLoading,
            isSuccess: loginIsSuccess
        }
    ] = useLoginUserMutation();

    const changeInputHandler = (e, type) => {
        const { name, value } = e.target;
        if (type === 'signup') {
            setSignupInput(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else {
            setLoginInput(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleRegistration = async type => {
        const inputData = type === 'signup' ? signupInput : loginInput;
        console.log('inputData ==', inputData);

        const action = type === 'signup' ? registerUser : loginUser;
        await action(inputData);
    };

    useEffect(() => {}, [
        registerData,
        registerError,
        registerIsLoading,
        registerIsSuccess,
        loginData,
        loginError,
        loginIsLoading,
        loginIsSuccess
    ]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <Tabs defaultValue="login" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signup" className="cursor-pointer">
                        Signup
                    </TabsTrigger>
                    <TabsTrigger value="login" className="cursor-pointer">
                        Login
                    </TabsTrigger>
                </TabsList>

                {/* Signup Form */}
                <TabsContent value="signup">
                    <Card className="shadow-xl border rounded-lg bg-white">
                        <CardHeader>
                            <CardTitle>Signup</CardTitle>
                            <CardDescription>
                                Create a new account here.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    type="text"
                                    value={signupInput.name}
                                    onChange={e =>
                                        changeInputHandler(e, 'signup')
                                    }
                                    name="name"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    value={signupInput.email}
                                    onChange={e =>
                                        changeInputHandler(e, 'signup')
                                    }
                                    name="email"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div className="space-y-1 relative">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    value={signupInput.password}
                                    onChange={e =>
                                        changeInputHandler(e, 'signup')
                                    }
                                    name="password"
                                    placeholder="Enter your password"
                                    required
                                />
                                <span
                                    className="absolute right-3 top-7 cursor-pointer text-gray-500"
                                    onClick={togglePassword}
                                >
                                    {showPassword ? (
                                        <AiOutlineEyeInvisible size={20} />
                                    ) : (
                                        <AiOutlineEye size={20} />
                                    )}
                                </span>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-2">
                            <Button
                                className="w-full cursor-pointer"
                                onClick={() => handleRegistration('signup')}
                                disabled={registerIsLoading}
                            >
                                {registerIsLoading ? (
                                    <Loader2
                                        className="animate-spin"
                                        size={20}
                                    />
                                ) : (
                                    'Signup'
                                )}
                            </Button>
                            <GoogleLoginAndLogout />
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* Login Form */}
                <TabsContent value="login">
                    <Card className="shadow-xl border rounded-lg bg-white">
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>
                                Welcome back! Login to your account.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    value={loginInput.email}
                                    onChange={e =>
                                        changeInputHandler(e, 'login')
                                    }
                                    name="email"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div className="space-y-1 relative">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    value={loginInput.password}
                                    onChange={e =>
                                        changeInputHandler(e, 'login')
                                    }
                                    name="password"
                                    placeholder="Enter your password"
                                    required
                                />
                                <span
                                    className="absolute right-3 top-7 cursor-pointer text-gray-500"
                                    onClick={togglePassword}
                                >
                                    {showPassword ? (
                                        <AiOutlineEyeInvisible size={20} />
                                    ) : (
                                        <AiOutlineEye size={20} />
                                    )}
                                </span>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-2">
                            <Button
                                className="w-full cursor-pointer"
                                onClick={() => handleRegistration('login')}
                                disabled={loginIsLoading}
                            >
                                {loginIsLoading ? (
                                    <Loader2
                                        className="animate-spin"
                                        size={20}
                                    />
                                ) : (
                                    'Login'
                                )}
                            </Button>
                            <GoogleLoginAndLogout />
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Login;
