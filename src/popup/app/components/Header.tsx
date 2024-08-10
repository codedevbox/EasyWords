import React from 'react';

/**
 * Header component for the extension popup.
 * This component displays the logo and title at the top of the popup.
 * @returns {JSX.Element} Header component JSX.
 */
const Header: React.FC = () => {
    // Get the URL of the extension icon
    const iconSrc = chrome.runtime.getURL("/images/ico48.png");
    
    return (
        <div className="popup-header">
            {/* Display the extension icon */}
            <span className="popup-icon">
                <img src={iconSrc} alt="EasyWord" className="header-icon" />
            </span>
            {/* Display the extension title */}
            <h1>EasyWord</h1>
        </div>
    );
}

export default Header;
