/**
 * Checks if a given word is present in a list, ignoring case sensitivity.
 * @param {string} word - The word to search for.
 * @param {string[]} list - The list of words to search within.
 * @returns {boolean} - True if the word is found in the list, otherwise false.
 */
export const isWordInList = (word: string, list: string[]): boolean => {
    return list.some(item => item.toLowerCase() === word.toLowerCase());
};

/**
 * Decorates all instances of a given word in the document with specified styling.
 * @param {string} word - The word to decorate.
 * @param {string} [type='selected'] - The type of decoration (e.g., 'selected' or 'unknown').
 */
export const decorateAllInstances = (word: string, type ='selected') => {
    const allTextNodes = getAllTextNodes(document.body);
    allTextNodes.forEach((textNode) => {
        const textContent = textNode.nodeValue ?? '';
        const index = textContent.toLowerCase().indexOf(word.toLowerCase());
        if (index !== -1) {
            const range = document.createRange();
            range.setStart(textNode, index);
            range.setEnd(textNode, index + word.length);
            const span = createSpanElement(word, type);
            range.surroundContents(span);
        }
    });
}

/**
 * Recursively processes a DOM node to collect all text nodes within it.
 * @param {Node} node - The node to process.
 * @param {Node[]} textNodes - An array to store collected text nodes.
 */
const processNode = (node: Node, textNodes: Node[]): void => {
    if (node.nodeType === Node.TEXT_NODE) {
        textNodes.push(node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        for (const childNode of (node as Element).childNodes) {
            processNode(childNode, textNodes);
        }
    }
}

/**
 * Retrieves all text nodes within a given DOM element.
 * @param {Node} element - The DOM element to search within.
 * @returns {Node[]} - An array of text nodes found within the element.
 */
const getAllTextNodes = (element: Node): Node[] => {
    const textNodes: Node[] = [];
    processNode(element, textNodes);
    return textNodes;
}

/**
 * Removes decoration from all instances of a given word in the document.
 * @param {string} word - The word to remove decoration from.
 */
export const removeDecorAllInstances = (word: string): void => {
    const allSpans = document.querySelectorAll(`span.easyWord_selectedWord, span.easyWord_knownWord`);

    allSpans.forEach((span) => {
        if (span.textContent?.toLowerCase() === word.toLowerCase()) {
            const parent = span.parentElement;
            if (parent) {
                const textNode = document.createTextNode(span.textContent || '');
                parent.replaceChild(textNode, span);
            }
        }
    });
}

/**
 * Creates and returns a span element with specified word and styling.
 * @param {string} word - The word to display in the span.
 * @param {string} type - The type of decoration for the span (e.g., 'selected' or 'unknown').
 * @returns {HTMLSpanElement} - The created span element.
 */
const createSpanElement = (word: string, type: string): HTMLSpanElement => {
    const span = document.createElement('span');
    span.textContent = word;
    switch (type) {
        case 'selected':
            span.className = 'easyWord_selectedWord';
            break;
        case 'unknown':
            span.className = 'easyWord_unknownWord';
            break;
    }
    return span;
}
