/**
 * Main script file integrated into the user's webpage.
 * This script initializes the extension, sets up event listeners, and handles incoming messages.
 */

// Importing necessary functions and modules
import { attachListeners, clearWords, highlightWords } from './utils/handlers';
import { addDynamicStyles } from './utils/styles';
import { removeDecorAllInstances } from './utils/text-process';
import { state } from './state/state.ts';

import { Request, WordData } from '../types';

/**
 * Initializes the extension by fetching data from the background script and setting up event listeners.
 */
const init = () => {
    // Fetch initial data from the background script
    chrome.runtime.sendMessage({ action: "GET_DATA" }, (response: WordData) => {

        // Update the state with received data
        state.settings = response.settings;
        state.words = response.words;
        state.dictionary = response.dictionary;

        // Apply dynamic styles
        addDynamicStyles();

        // Attach event listeners
        attachListeners();

        // Highlight words based on user settings
        highlightWords();
        
    });

    // Listen for messages from the background script
    chrome.runtime.onMessage.addListener((request: Request) => {
        // Handle messages related to word deletion and clearing words
        if (request.action === "WORD_DELETED_POPUP") {
            if (typeof request.payload === 'string') {
                state.words = state.words.filter(item => item !== request.payload);
                removeDecorAllInstances(request.payload);
            }
        }
        if (request.action === "CLEAR_WORDS_POPUP") {
            clearWords();
        }
    });

    // Listen for the 'pageshow' event to re-highlight words when the page is shown
    window.addEventListener('pageshow', highlightWords);
};

// Call the initialization function
init();
