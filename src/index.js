import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/all';
import { AuthProvider } from './contexts/auth';
import Routes from './routes';

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <Routes />
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
