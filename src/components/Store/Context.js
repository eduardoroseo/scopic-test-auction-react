import { createContext } from 'react';

const StoreContext = createContext({
    token: null,
    setToken: () => {},
    formErrors: []
});

export default StoreContext;