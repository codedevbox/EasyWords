/**
 * Attaches event listeners to the document for handling user interactions.
 * These interactions include double clicks, mouse-up events, and clicks outside of selected text.
 */
import { state } from "../state/state";
import { decorateAllInstances, isWordInList, removeDecorAllInstances } from "./text-process";

// Variable to store the timestamp of the last click event
let lastClickTime = 0;

/**
 * Attaches event listeners to the document.
 * Calls appropriate functions based on user interactions.
 */
export const attachListeners = () => {
    // Add listener for double clicks to handleDoubleClick function
    document.addEventListener('dblclick', handleDoubleClick());
    // Add listener for mouse-up events to handleMouseUP function
    document.addEventListener('mouseup', handleMouseUP());
    // Add listener for clicks outside of selected text
    document.addEventListener('click', function(e) {
        // Remove "Add to list" button if it exists and the click target is not the button itself
        const existingButton = document.querySelector('.easyWord_addToList');
        if (!window.getSelection()?.toString() && existingButton && e.target !== existingButton) {
            existingButton.remove();
        }
    });
    // Add listener for window scroll events to remove "Add to list" button
    window.addEventListener('scroll', function() {
        const existingButton = document.querySelector('.easyWord_addToList');
        if (existingButton) {
            existingButton.remove();
        }
    });
};

/**
 * Handles double-click events to edit word list.
 */
const handleDoubleClick = () => () => {
    // Update the last click time
    lastClickTime = new Date().getTime();
    // Get the selected word
    const selectedWord = window.getSelection()?.toString().trim();
    if (selectedWord) {
        editWordList(selectedWord);
    }
}

/**
 * Handles mouse-up events to trigger actions based on selected text.
 */
const handleMouseUP = () => (e:MouseEvent) => {
    // Calculate the time since the last click event
    const now = new Date().getTime();
    // Check if the time difference is less than 300 milliseconds to avoid double triggering
    if (now - lastClickTime < 300) {
        return;
    }
    // Get the selected text
    const selectedText = window.getSelection()?.toString().trim();
    if (selectedText) {
        const existingButton = document.querySelector('.easyWord_addToList');
        if (existingButton && e.target === existingButton) {
            // If "Add to list" button exists and is clicked, edit the word list
            editWordList(selectedText);
            existingButton.remove();
        } else {
            // If no button exists or the click is outside the button, show "Add to list" button
            if (existingButton) {
                existingButton.remove();
            }
            const addButton = document.createElement('button');
            addButton.textContent = 'Add to list';
            addButton.className = 'easyWord_addToList';
            addButton.style.position = 'absolute';
            addButton.style.left = `${e.pageX}px`;
            addButton.style.top = `${e.pageY}px`;
            document.body.appendChild(addButton);
            // Remove the button after 3 seconds
            setTimeout(() => {
                if (addButton.parentNode) {
                    addButton.remove();
                }
            }, 3000);
        }
    }
    // Update the last click time
    lastClickTime = new Date().getTime();
}

/**
 * Edits the word list based on user interactions.
 * @param {string} word - The word to edit the list with.
 */
const editWordList = (word: string) => {
    // Check if the word is already in the dictionary
    const alreadyInDictionary = isWordInList(word, state.dictionary);
    if(alreadyInDictionary) {
        alert('You already know this word!');
        return;
    }

    // If the word is not in the dictionary, add or delete it based on its presence in the word list
    const indexInWords = state.words.indexOf(word);
    if (indexInWords === -1) {
        chrome.runtime.sendMessage({ action: 'ADD_WORD_CONTENT', payload: word }, () => {
            if (chrome.runtime.lastError) {
                console.error("Error adding word:", chrome.runtime.lastError);
            } else {
                state.words.push(word);
                decorateAllInstances(word);
            }
        });
    } else {
        chrome.runtime.sendMessage({ action: 'DELETE_WORD_CONTENT', payload: word }, () => {
            if (chrome.runtime.lastError) {
                console.error("Error deleting word:", chrome.runtime.lastError);
            } else {
                state.words.splice(indexInWords, 1);
                removeDecorAllInstances(word);
            }
        });
    }
}

/**
 * Highlights words on the page based on user settings.
 */
export const highlightWords = () => {
    if(state.settings && state.settings.highlightSelectedWords){
        state.words.forEach((word) => decorateAllInstances(word, 'selected'));
    }
};

/**
 * Clears all highlighted words from the page.
 */
export const clearWords = () => {
    if(state.words){
        state.words.forEach(word => removeDecorAllInstances(word));
        state.words = [];
    }
};
