import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { verifyToken } from '../services/api';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const [isValid, setIsValid] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsValid(false);
                return;
            }
            try {
                const res = await verifyToken(token);
                setIsValid(res.valid);
            } catch (err) {
                localStorage.removeItem('token');
                setIsValid(false);
            }
        };

        checkAuth();
    }, []);

    if (isValid === null) {
        return <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', color: '#00393e' }}>Authenticating...</div>;
    }

    return isValid ? <>{children}</> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
