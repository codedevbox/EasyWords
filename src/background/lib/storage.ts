/**
 * Provides methods to interact with the browser's local storage,
 * specifically for managing the settings, words, and dictionary of the extension.
 */

import { Settings, Words, Dictionary, WordData } from "../../types";

// Default settings for the extension if none are stored in the local storage.
const defaultSettings: Settings = {
    highlightSelectedWords: true,
    unknownWordsColor: '#FF0000',
    selectedWordsColor: '#acf7c1',
};

// Default empty list of words if none are stored.
const defaultWords: Words = [];

// Default dictionary containing a basic set of words.
const defaultDictionary: Dictionary = ['and', 'is', 'online'];

/**
 * Retrieves the comprehensive word data from local storage, including settings, words, and the dictionary.
 * @returns A Promise that resolves to the WordData object containing all retrieved data.
 */
export const getWordData = async (): Promise<WordData> => {
    const settings = await getStorage<Settings>('settings', defaultSettings);
    const words = await getStorage<Words>('words', defaultWords);
    const dictionary = await getStorage<Dictionary>('dictionary', defaultDictionary);
    return { settings, words, dictionary };
};

/**
 * Retrieves the list of user-added words from local storage.
 * @returns A Promise that resolves to an array of words.
 */
export const getWords = async (): Promise<Words> => {
    return await getStorage<Words>('words', defaultWords);
};

/**
 * Updates the list of user-added words in local storage.
 * @param words - The new list of words to store.
 */
export const setWords = async (words: Words): Promise<void> => {
    await setStorage<Words>('words', words);
};

/**
 * Removes a single word from the list of user-added words in local storage.
 * @param word - The word to be removed.
 */
export const deleteWords = async (word: string): Promise<void> => {
    const words = await getStorage<Words>('words', defaultWords);
    const newWords = words.filter(item => item !== word);
    await setWords(newWords);
};

/**
 * Adds a new word to the list of user-added words in local storage.
 * @param word - The word to be added.
 */
export const addWords = async (word: string): Promise<void> => {
    const words = await getStorage<Words>('words', defaultWords);
    words.push(word);
    await setWords(words);
};

/**
 * Generic method to retrieve data from local storage.
 * @param key - The key under which the data is stored.
 * @param defaultValue - The default value to return if the key does not exist.
 * @returns A Promise that resolves to the data retrieved from storage.
 */
export const getStorage = async <T>(key: string, defaultValue: T): Promise<T> => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get([key], (result) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(result[key] as T || defaultValue);
            }
        });
    });
};

/**
 * Generic method to update data in local storage.
 * @param key - The key under which the data should be stored.
 * @param data - The data to store.
 */
export const setStorage = async <T>(key: string, data: T): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        chrome.storage.local.set({ [key]: data }, () => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve();
            }
        });
    });
};
