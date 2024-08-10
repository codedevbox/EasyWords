/**
 * Defines and injects dynamic styles into the web page for the browser extension.
 * Utilizes the state from "../state/state" to apply user-defined settings for word highlighting.
 * This module focuses on the visual presentation of selected and unknown words, as well as
 * styling for interactive elements added by the extension.
 */

// Importing the shared state, which includes user settings for word highlighting.
import { state } from "../state/state";

/**
 * Adds dynamically generated CSS styles to the web page.
 * The styles are derived from the user settings stored in the state, specifically
 * for selected and unknown words. Also, styles for the "Add to List" button
 * are included to enhance the interactive experience.
 */
export const addDynamicStyles = () => {
    // Create a new style element
    const styleElement = document.createElement('style');
    
    // Define CSS content with dynamic values based on user settings for word highlighting
    styleElement.textContent = `
        .easyWord_selectedWord {
            display: inline-flex;
            align-items: center;
            background-color: ${state.settings.selectedWordsColor}; /* Background color for selected words */
            border-radius: 30px;
            padding: 5px 10px;
            margin: 0 5px;
            cursor: default;
        }

        .easyWord_unknownWord {
            display: inline-flex;
            align-items: center;
            background-color: ${state.settings.unknownWordsColor}; /* Background color for unknown words */
            border-radius: 10px;
            padding: 5px 10px;
            margin: 0 5px;
            border: solid 1px #f9f781;
        }

        .easyWord_addToList {
            background-color: #007BFF; /* Primary button color */
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            transition: background-color 0.3s, box-shadow 0.3s;
        }
          
        .easyWord_addToList:hover {
            background-color: #0056b3; /* Hover state color */
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
          
        .easyWord_addToList:active {
            background-color: #004494; /* Active state color */
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
    `;

    // Append the style element to the document head to apply the styles
    document.head.appendChild(styleElement);
}
