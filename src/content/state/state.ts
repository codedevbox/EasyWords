/**
 * Defines the initial state of the browser extension, including settings, words, and dictionary.
 * This state is used to store user preferences, the list of words added by the user, and
 * a dictionary of words known to the user. It serves as the foundational data structure
 * for managing and displaying word-related information within the extension.
 */

import { WordData } from "../../types";

/**
 * The initial state of the browser extension, conforming to the WordData interface.
 * It initializes the settings with default values (e.g., highlightSelectedWords as false),
 * and starts with empty arrays for words and dictionary.
 */
export const state: WordData = {
    settings: {
        highlightSelectedWords: false, // Initially, words selected by the user are not highlighted.
        unknownWordsColor: '',         // Default color for unknown words is not set.
        selectedWordsColor: '',        // Default color for selected words is not set.
    },
    words: [],    // Starts with an empty list of words.
    dictionary: [], // Starts with an empty dictionary.
};
