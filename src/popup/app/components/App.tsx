import React from 'react';
import useWords from "../hooks/useWords";
import Introduction from "../pages/introduction/Introduction";
import WordsPage from "../pages/words/WordsPage";
import Header from "./Header";

/**
 * Main component representing the extension popup.
 * This component renders the header, introduction or words page based on the state of words list.
 * @returns {JSX.Element} App component JSX.
 */
const App: React.FC = () => {
    // Custom hook for managing words list
    const { words, deleteWord, clearWords } = useWords();

    return (
        <div className="popup-container">
            {/* Render the header component */}
            <Header />
            {/* Conditional rendering based on the presence of words in the list */}
            {words.length > 0 ? <WordsPage words={words} onDelete={deleteWord} onClear={clearWords} /> : <Introduction />}
        </div>
    );
}

export default App;
