import { createContext } from 'react';

const StoreContent = createContext({
    token: null,
    setToken: () => {},
    formErrors: []
});

export default StoreContent;