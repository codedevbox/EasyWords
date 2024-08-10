/**
 * Interface for user settings within the browser extension.
 * @property {boolean} highlightSelectedWords - Determines whether words selected by the user are highlighted.
 * @property {string} unknownWordsColor - Specifies the color used to highlight unknown words. Accepts CSS color values.
 * @property {string} selectedWordsColor - Defines the color for highlighting selected words by the user. Accepts CSS color values.
 */
export interface Settings {
    highlightSelectedWords: boolean;
    unknownWordsColor: string;
    selectedWordsColor: string;
}

/**
 * Type representing a list of words added by the user.
 * Each string in the array is a word that the user wants to track or has interacted with.
 */
export type Words = string[];

/**
 * Type representing the comprehensive list of words acknowledged by the user.
 * This includes both known and unknown words.
 */
export type Dictionary = string[];

/**
 * Interface combining user settings, added words, and the complete dictionary.
 * This structure is utilized for managing and storing user data within the extension.
 * @property {Settings} settings - User-defined settings affecting appearance and functionality.
 * @property {Words} words - User-added words for tracking or interaction.
 * @property {Dictionary} dictionary - Full list of words recognized by the user.
 */
export interface WordData {
    settings: Settings;
    words: Words;
    dictionary: Dictionary;
}

/**
 * Interface for representing requests made within the extension.
 * Used for messaging between different parts of the extension, like background scripts and UI components.
 * @property {string} action - Identifies the request type or action to be performed.
 * @property {string} [payload] - Optional additional information for the request, depending on the action.
 */
export interface Request {
    action: string;
    payload?: string;
}
