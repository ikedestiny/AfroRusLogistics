import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authStore } from '../state/authStore';

const Navbar = () => {
    const { token, logout } = authStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to home after logout
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center py-4">
                    <div className="text-center md:text-left mb-3 md:mb-0">
                        <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
                            <img
                                src="/logo.png"
                                alt="RUS-NGA Logo"
                                className="h-20 mr-3"
                            />
                            <div>
                                <h1 className="text-2xl md:text-3xl font-light text-gray-900 mb-1 tracking-tight">
                                    <span className="font-medium">NAIJA</span>↔<span className="font-medium">RUSHH</span>
                                </h1>
                                <p className="text-neutral-500 text-xs md:text-sm">Efficient Russia-Nigeria logistics</p>
                            </div>
                        </Link>
                    </div>

                    <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
                        <Link
                            to="/"
                            className="px-2 py-1 text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium"
                        >
                            Home
                        </Link>
                        <Link
                            to="/request"
                            className="px-2 py-1 text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium"
                        >
                            Need Space
                        </Link>
                        <Link
                            to="/form"
                            className="px-2 py-1 text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium"
                        >
                            Have Space
                        </Link>
                        {token ? (
                            <button
                                onClick={handleLogout}
                                className="px-2 py-1 text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/auth"
                                className="px-2 py-1 text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium"
                            >
                                Login
                            </Link>
                        )}
                        <Link
                            to="/contact"
                            className="px-2 py-1 text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium"
                        >
                            Contact
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;