import React from 'react';

// Props interface for ExportControls component
interface ExportControlsProps {
    // Callback function for copying words to clipboard
    onCopy: () => void;
    // Callback function for exporting words to CSV
    onExport: () => void;
    // Callback function for clearing words list
    onClear: () => void;
}

/**
 * ExportControls component for managing word list in the extension popup.
 * This component provides buttons for copying words, exporting words to CSV, and clearing the words list.
 * @param {ExportControlsProps} props - Props containing callback functions for button actions.
 * @returns {JSX.Element} ExportControls component JSX.
 */
const ExportControls: React.FC<ExportControlsProps> = ({ onCopy, onExport, onClear }) => {
    return (
        <div className="export-controls">
            {/* Button to copy words to clipboard */}
            <button className="copy-button" onClick={onCopy}>Copy</button>
            {/* Button to export words to CSV */}
            <button className="export-button" onClick={onExport}>Export</button>
            {/* Button to clear the words list */}
            <button className="clear-button" onClick={onClear}>Clear</button>
        </div>
    );
}

export default ExportControls;
