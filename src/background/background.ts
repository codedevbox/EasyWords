/**
 * The main service worker file for the browser extension.
 * Initializes the background tasks and sets up message listeners
 * for handling communication with other parts of the extension.
 * 
 * Utilizes `initMessageListeners` from './lib/messageHandlers' to
 * start listening for incoming messages and commands.
 */

// Import the initMessageListeners function from the messageHandlers library.
// This function is responsible for setting up the message listeners used by the service worker.
import { initMessageListeners } from './lib/messageHandlers';

// Call initMessageListeners to start listening for messages.
// This is the initial setup action for the service worker, allowing it
// to respond to messages from other parts of the extension, such as the popup or content scripts.
initMessageListeners();
