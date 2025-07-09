import { useState } from 'react';
import LoginForm from '../componets/LoginForm';
import RegisterForm from '../componets/RegisterForm';
import { authStore } from '../state/authStore';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { token } = authStore();

    if (token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                        You are already logged in
                    </h2>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    {isLogin ? 'Log In to Your Account' : 'Create an Account'}
                </h2>
                {isLogin ? (
                    <LoginForm key="login" />
                ) : (
                    <RegisterForm key="register" />
                )}
                <p className="mt-6 text-sm text-center text-gray-600">
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-600 hover:underline font-medium"
                    >
                        {isLogin ? 'Register' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthPage;