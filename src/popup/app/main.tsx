/**
 * Main file for the extension popup window.
 * This file renders the root React component 'App' into the DOM.
 */

// Import necessary dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

// Render the root React component 'App' into the DOM
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <div className="popup-container">
            <App />
        </div>
    </React.StrictMode>
);
