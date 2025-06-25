import { useState, useEffect } from 'react';
import { authStore } from '../state/authStore';
import GoogleLoginButton from './GoogleLoginButton';

const LoginForm = () => {
    const {
        email,
        password,
        error, // Get error from authStore
        setEmail,
        setPassword,
        loginUser,
        clearError // Add this to your authStore to manually clear errors
    } = authStore();

    const [isLoading, setIsLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [authError, setError] = useState(null);

    // Combine store errors and local errors
    useEffect(() => {
        if (authError) {
            setError(authError);
        }
    }, [authError]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
        // Clear errors when user starts typing
        if (error) {
            setError(null);
            clearError();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            await loginUser();
        } catch (err) {
            // Error is already handled in the store
            setError(err)
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async (token) => {
        setGoogleLoading(true);
        setError(null);

        try {
            const res = await fetch('http://localhost:5000/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token }),
            });

            if (!res.ok) {
                throw new Error(await res.text() || 'Google login failed');
            }

            const data = await res.json();
            console.log('Login success:', data);
        } catch (err) {
            setError(err.message || 'Google login failed');
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message - Fixed at top and stays visible */}
            {error && (
                <div className="p-4 mb-4 text-red-700 bg-red-100 border-l-4 border-red-500 rounded">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">{error}</span>
                    </div>
                </div>
            )}

            {/* Email Field with error styling */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                    disabled={isLoading || googleLoading}
                />
            </div>

            {/* Password Field with error styling */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                    disabled={isLoading || googleLoading}
                />
            </div>

            <GoogleLoginButton
                onSuccess={handleGoogleLogin}
                disabled={isLoading || googleLoading}
                loading={googleLoading}
            />

            <button
                type="submit"
                disabled={isLoading || googleLoading}
                className={`w-full py-2 px-4 rounded-md text-white transition flex justify-center items-center ${isLoading || googleLoading
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                    } ${error ? 'mt-2' : 'mt-6'
                    }`}
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Logging in...
                    </>
                ) : (
                    'Log In'
                )}
            </button>
        </form>
    );
};

export default LoginForm;