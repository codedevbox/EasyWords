/**
 * Custom hook for copying text to the clipboard.
 * This hook provides a function to copy the provided text to the clipboard.
 * It utilizes the Navigator Clipboard API for clipboard operations.
 * @returns {Function} A function to copy text to the clipboard.
 */
const useClipboard = () => {
    /**
     * Copies the provided text to the clipboard.
     * Displays an alert message upon successful copying or logs an error message on failure.
     * @param {string} text - The text to copy to the clipboard.
     */
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('Copied to clipboard!');
        }, (err) => {
            console.error('Could not copy to clipboard: ', err);
        });
    };

    return copyToClipboard;
};

export default useClipboard;
