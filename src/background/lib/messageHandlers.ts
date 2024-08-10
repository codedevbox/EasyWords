/**
 * Defines and initializes message listeners for the browser extension.
 * This module is responsible for handling different types of messages sent to the background script,
 * including requests for data retrieval, manipulation, and communication with content scripts.
 */

// Import functions from the storage module for manipulating and retrieving word data.
import { addWords, deleteWords, getWordData, getWords, setWords } from './storage';

// Import the Request interface from the types module to ensure proper request handling.
import { Request } from '../../types';

/**
 * Initializes message listeners for handling incoming requests.
 * This function sets up the chrome.runtime.onMessage event listener to respond to various actions,
 * including fetching, adding, and deleting words, as well as clearing word lists.
 */
export const initMessageListeners = () => {
    chrome.runtime.onMessage.addListener((request: Request, _sender, sendResponse) => {
        // Handle "GET_DATA" action: Retrieve and send word data.
        if (request.action === "GET_DATA") {
            void getWordData().then(sendResponse).catch(error => {
                console.error("Error fetching data:", error);
            });
        }

        // Handle "GET_WORDS" action: Retrieve and send words list.
        if (request.action === "GET_WORDS") {
            void getWords().then(sendResponse).catch(error => {
                console.error("Error fetching words:", error);
            });
        }

        // Handle "ADD_WORD_CONTENT" action: Add a word to the storage.
        if (request.action === "ADD_WORD_CONTENT" && request.payload !== undefined) {
            void addWords(request.payload).then(sendResponse).catch(error => {
                console.error("Error adding word:", error);
            });
        }

        // Handle "DELETE_WORD_CONTENT" action: Delete a word from storage.
        if (request.action === "DELETE_WORD_CONTENT" && request.payload !== undefined) {
            void deleteWords(request.payload).then(sendResponse).catch(error => {
                console.error("Error deleting word:", error);
            });
        }

        // Handle "CLEAR_WORDS_POPUP" action: Clear the words list and notify the active tab.
        if (request.action === "CLEAR_WORDS_POPUP") {
            void setWords([]).then(() => {
                 /* eslint-disable @typescript-eslint/no-floating-promises */
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    if (tabs.length > 0 && tabs[0].id !== undefined) {
                        chrome.tabs.sendMessage(tabs[0].id, { action: "CLEAR_WORDS_POPUP" });
                    }
                });
            }).catch(error => {
                console.error("Error clearing data:", error);
            });
        }

        // Handle "DELETE_WORD_POPUP" action: Delete a word and notify the active tab.
        if (request.action === "DELETE_WORD_POPUP" && request.payload !== undefined) {
            void deleteWords(request.payload).then(() => {
                 /* eslint-disable @typescript-eslint/no-floating-promises */
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    if (tabs.length > 0 && tabs[0].id !== undefined) {
                        chrome.tabs.sendMessage(tabs[0].id, { action: "WORD_DELETED_POPUP", payload: request.payload });
                    }
                });
            }).catch(error => {
                console.error("Error deleting word from popup:", error);
            });
        }

        // Ensures asynchronous response sending by returning true.
        return true;
    });
};
