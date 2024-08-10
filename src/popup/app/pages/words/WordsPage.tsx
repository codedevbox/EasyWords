import React from 'react';
import ExportControls from "../../components/ExportControls";
import useClipboard from "../../hooks/useClipboard";
import useExportCSV from "../../hooks/useExportCSV";

// Props interface for WordsPage component
interface WordsPageProps {
    // List of words to display
    words: string[];
    // Callback function for deleting a word from the list
    onDelete: (wordToDelete: string) => void;
    // Callback function for clearing the entire list of words
    onClear: () => void;
}

/**
 * WordsPage component for managing the list of words in the extension popup.
 * This component displays the list of words and provides tools for copying, exporting, and clearing the list.
 * @param {WordsPageProps} props - Props containing words list and callback functions for word actions.
 * @returns {JSX.Element} WordsPage component JSX.
 */
const WordsPage: React.FC<WordsPageProps> = ({ words, onDelete, onClear }) => {
    // Custom hook for copying to clipboard
    const copyToClipboard = useClipboard();
    // Custom hook for exporting words to CSV
    const exportCSV = useExportCSV();

    // Callback function to handle copying words to clipboard
    const handleCopy = () => {
        copyToClipboard(words.join('\n'));
    };

    // Callback function to handle exporting words to CSV
    const handleExport = () => {
        exportCSV(words, 'words_list.csv');
    };

    return (
        <div className="word-list-wrap">
            {/* Display the list of words */}
            <ul className="word-list">
                {
                    [...words].reverse().map((word) => (
                        <li key={word}>
                            {/* Display the word */}
                            <span className="word-title">{word}</span>
                            {/* Button to delete the word */}
                            <span className="delete-button-wrap" onClick={() => onDelete(word)}>
                                <span className="delete-button">&#128465;</span>
                            </span>
                        </li>
                    ))
                }
            </ul>
            {/* Display export controls for copying, exporting, and clearing the list */}
            <ExportControls onCopy={handleCopy} onExport={handleExport} onClear={onClear}/>
        </div>
    );
}

export default WordsPage;
