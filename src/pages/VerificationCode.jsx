import { useState, useRef, useEffect } from 'react';
import { authStore } from '../state/authStore';
import { useNavigate } from 'react-router-dom';

const VerificationCode = () => {
    const { email, verifyEmail, error, setError } = authStore();
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const [isResending, setIsResending] = useState(false);
    const inputRefs = useRef([]);
    const navivage = useNavigate()

    // Focus first input on mount
    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    // Countdown timer
    useEffect(() => {
        if (countdown <= 0) return;
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
    }, [countdown]);

    const handleChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        if (index === 5 && value) {
            handleSubmit();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();

        const verificationCode = code.join('');
        if (verificationCode.length !== 6) {
            setError('Please enter a 6-digit code');
            return;
        }

        setIsLoading(true);
        try {
            await verifyEmail(verificationCode);
            navivage("/")
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendCode = async () => {
        if (countdown > 0) return;

        setIsResending(true);
        setError('');
        try {
            // Call your API endpoint to resend the verification code
            const response = await fetch('/api/resend-verification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error('Failed to resend verification code');
            }

            setCountdown(60); // Reset the countdown
        } catch (err) {
            setError(err.message || 'Failed to resend code. Please try again.');
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify Your Email</h2>
                    <p className="text-gray-600">
                        We've sent a 6-digit code to <span className="font-semibold">{email}</span>
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between gap-2 sm:gap-3">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                ref={(el) => (inputRefs.current[index] = el)}
                                disabled={isLoading}
                                className={`w-full h-14 sm:h-16 text-2xl text-center rounded-lg border-2 ${error ? 'border-red-500' : 'border-gray-200'
                                    } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition`}
                            />
                        ))}
                    </div>

                    {error && (
                        <p className="text-sm text-red-600 text-center">{error}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading || code.join('').length !== 6}
                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Verifying...
                        </span>
                    ) : 'Verify Account'}
                </button>

                <div className="text-center text-sm text-gray-500">
                    <p>Didn't receive a code?</p>
                    <button
                        type="button"
                        onClick={handleResendCode}
                        disabled={countdown > 0 || isResending}
                        className={`mt-1 font-medium ${countdown > 0 || isResending
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-blue-600 hover:text-blue-800'
                            } transition`}
                    >
                        {isResending ? (
                            'Resending...'
                        ) : countdown > 0 ? (
                            `Resend code in ${countdown}s`
                        ) : (
                            'Resend verification code'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default VerificationCode;