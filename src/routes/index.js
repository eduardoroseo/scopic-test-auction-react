import React from 'react';
import { useAuth } from '../contexts/auth';
import AuthRoutes from './auth.routes';
import PrivateRoutes from './private.routes';

export default function Routes() {
    const { signed, loading } = useAuth();

    if (loading) return null;

    return signed ? <PrivateRoutes /> : <AuthRoutes />
}