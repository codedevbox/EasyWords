// Import React hooks for managing component state and side effects
import { useState, useEffect } from 'react';

// Import the 'Words' type from the types file located in the relative path '../../../types'
import { Words } from '../../../types';


/**
 * Custom hook for managing words in the extension popup.
 * This hook provides functions to fetch, delete, and clear words from the popup window.
 * @returns {Object} An object containing words array, deleteWord function, and clearWords function.
 */
const useWords = () => {
    // State to store the list of words
    const [words, setWords] = useState<Words>([]);

    // Effect to fetch words when the component mounts
    useEffect(() => {
        const fetchWords = (): Promise<Words> => {
            return new Promise((resolve, reject) => {
                // Fetch words from the background script
                chrome.runtime.sendMessage({ action: 'GET_WORDS' }, (response: Words | undefined) => {
                    if (chrome.runtime.lastError) {
                        reject(chrome.runtime.lastError);
                    } else {
                        resolve(response ?? []);
                    }
                });
            })
        };

        // Fetch words and update state
        const getWords = async () => {
            try {
                const wordsResponse = await fetchWords();
                setWords(wordsResponse);
            } catch (error) {
                console.log('Error fetching words:', error);
                setWords([]);
            }
        }

        void getWords();

    }, []);

    /**
     * Deletes a word from the list of words.
     * @param {string} wordToDelete - The word to delete.
     */
    const deleteWord = (wordToDelete: string) => {
        const updatedWords = words.filter(word => word !== wordToDelete);
        setWords(updatedWords);

        // Send message to background script to delete word
        void chrome.runtime.sendMessage({
            action: 'DELETE_WORD_POPUP',
            payload: wordToDelete
        });
    };

    /**
     * Clears all words from the list.
     */
    const clearWords = () => {
        setWords([]);

        // Send message to background script to clear words
        void chrome.runtime.sendMessage({
            action: 'CLEAR_WORDS_POPUP'
        });
    };

    // Return words array, deleteWord function, and clearWords function
    return { words, deleteWord, clearWords };
}

export default useWords;
