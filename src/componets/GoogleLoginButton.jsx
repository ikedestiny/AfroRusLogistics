import { useEffect, useRef } from 'react';

const GoogleLoginButton = ({ onSuccess }) => {
    const buttonRef = useRef(null);

    useEffect(() => {
        if (window.google && buttonRef.current) {
            window.google.accounts.id.initialize({
                client_id: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your actual client ID
                callback: handleCredentialResponse,
            });

            window.google.accounts.id.renderButton(buttonRef.current, {
                theme: 'outline',
                size: 'large',
                width: '100%',
            });

            // Optional: auto-login
            // window.google.accounts.id.prompt();
        }
    }, []);

    const handleCredentialResponse = (response) => {
        // response.credential is a JWT token you can send to your backend
        console.log('Google credential:', response.credential);
        onSuccess(response.credential);
    };

    return <div ref={buttonRef}></div>;
};

export default GoogleLoginButton;
