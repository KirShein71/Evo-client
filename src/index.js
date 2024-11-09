import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import { AppContextProvider } from './context/AppContext'


import './index.css';
import App from './App';

export const Context = createContext(null)

window.onerror = function (message, source, lineno, colno, error) {
    console.error("Глобальная ошибка:", message, source, lineno, colno, error);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <AppContextProvider>
        <App />
    </AppContextProvider>
  
);


