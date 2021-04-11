import React from 'react';
import Context from './Context';
import useStorage from 'utils/useStorage';

import api from '../../utils/api';

const StoreProvider = ({ children }) => {
    const [token, setToken] = useStorage('token');

    async function handleLogin (email, password) {
        const { data: { content: { token } }} = await api.post('/login', { email, password });
        
        setToken(token);
    }

    return (
        <Context.Provider
            value={{ 
                token,
                setToken,
                handleLogin
             }}
        >
            {children}
        </Context.Provider>
    )
}

export default StoreProvider;