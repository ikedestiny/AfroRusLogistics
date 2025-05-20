import { useState } from 'react';
import GoogleLoginButton from './GoogleLoginButton';

const LoginForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Logging in with', formData);
        // TODO: call your backend login endpoint here
    };

    const handleGoogleLogin = async (token) => {
        // Send token to backend for verification & login
        try {
            const res = await fetch('http://localhost:5000/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token }),
            });

            const data = await res.json();
            console.log('Login success:', data);
            // Save token / redirect / etc.
        } catch (err) {
            console.error('Google login failed', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <GoogleLoginButton onSuccess={handleGoogleLogin} />

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
                Log In
            </button>
        </form>
    );
};

export default LoginForm;
