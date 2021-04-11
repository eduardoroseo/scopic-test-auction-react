import React, { useEffect, useState } from 'react';
import Context from './Context';
import useStorage from 'utils/useStorage';

import api from '../../utils/api';

export function StoreProvider ({ children }) {
    const [token, setToken] = useStorage('token');
    const [loadingApi, setLoadingApi] = useState(true);

    useEffect(() => {
        if (token) {
            api.defaults.headers.Authorization = `Bearer ${token}`;
            setLoadingApi(false);
        }
    }, [token])

    async function handleLogin (email, password) {
        const { data: { content: { token } }} = await api.post('/login', { email, password });
        
        setToken(token);
    }

    return (
        <Context.Provider
            value={{ 
                token,
                setToken,
                loadingApi,
                handleLogin
             }}
        >
            {children}
        </Context.Provider>
    )
}