![EasyWords Banner](./info/easywords-banner.png)

# EasyWords: Your Language Learning Companion 📚💡

Welcome to EasyWords – the Chrome extension that revolutionizes the way you manage new words while browsing! 🚀

## Overview

EasyWords is a Chrome extension designed to help language learners easily compile a list of unknown words they encounter on web pages. With just a double click on a word, you can add it to your personal vocabulary list. But that's not all – EasyWords also offers fast export options for editing in electronic spreadsheets or copying to the clipboard, making your language learning process as smooth as possible.

## Features

- **Quick Word Capture:** Double-click on any word on a webpage to add it to your list of new vocabulary. This feature allows for immediate capture of unfamiliar words as you encounter them.
- **Phrase Addition:** Not just single words, but with EasyWords, you can also add phrases to your vocabulary list. Simply highlight the text you wish to learn, and click the "Add" button that appears, making it easier to understand context and usage.
- **Easy Export Options:** Export your list of words and phrases to electronic spreadsheet formats or copy them directly to your clipboard. This functionality supports seamless integration with your existing study or review workflows.
- **Customizable Settings:** Personalize your learning experience by adjusting the settings to match your preferences. Whether it's changing the highlight color or configuring export options, EasyWords adapts to your study habits.
- **Interactive Learning:** Enhance your vocabulary without leaving your browser or interrupting your reading experience. EasyWords is designed to complement your natural browsing and reading behavior, turning everyday web exploration into a learning opportunity.


## Technological Description

EasyWords is built using modern web development technologies to ensure a smooth and responsive user experience. Below is an overview of the key technologies and tools used in the development of EasyWords:

- **TypeScript:** Offers static type-checking along with the latest ECMAScript features, ensuring robust and maintainable code.
- **React:** Utilized for creating a dynamic and responsive user interface.
- **Vite:** A fast and modern build tool that provides a smoother and faster development experience.
- **Yarn:** Used as a package manager for handling the project's dependencies efficiently.
- **ESLint and TypeScript ESLint:** Implements linting to ensure code quality and adherence to coding standards.


## Preparing the Extension for Installation

Before installing the EasyWords extension on your Chrome browser, you need to prepare it by following these steps:

1. **Clone the Repository:**
   First, clone the EasyWords repository to your local machine. Open a terminal and run the following command:

   ```bash
   git clone https://github.com/codedevbox/EasyWords.git
   ```

2. **Install Dependencies:**
   Navigate to the cloned repository's directory and install the necessary dependencies using Yarn. Run:

   ```bash
   yarn install
   ```

3. **Build the Extension:**
   Once the dependencies are installed, you can build the extension for production by running:

   ```bash
   yarn build
   ```

This command compiles the extension and generates a dist directory containing the build artifacts.

After completing these steps, your EasyWords extension is ready to be installed in your Chrome browser.


## Installing the Extension Manually

If the EasyWords extension is not available in the Google Chrome Web Store, you can still install it manually using the Developer mode in Chrome. Follow these steps to install the extension directly from the `dist` folder:

1. **Open Chrome Extensions Page:**
   Launch Google Chrome and navigate to the Extensions page by entering `chrome://extensions/` in the address bar.

2. **Enable Developer Mode:**
   Toggle the "Developer mode" switch in the top-right corner of the Extensions page to enable it.

3. **Load Unpacked Extension:**
   Click the "Load unpacked" button that appears after enabling Developer mode. A file dialog will open.

4. **Select the `dist` Folder:**
   Navigate to the location of your EasyWords extension's `dist` folder (the folder created after building the extension with `yarn build`). Select the `dist` folder and click "Open" or "Select Folder" (depending on your operating system).

Chrome will now install the EasyWords extension directly from the selected folder. You should see the EasyWords extension icon appear in your Chrome toolbar, indicating that the installation was successful.

5. **Use the Extension:**
   Click on the EasyWords extension icon in the Chrome toolbar to start using it. You can now easily capture new words and phrases as you browse.

Remember, since this extension is installed manually, it will not automatically update. To update the extension, you will need to pull the latest changes from the repository, rebuild the extension, and then repeat the steps above to load the updated version.

## License

This project is licensed under the MIT License.

## Contact

For questions or feedback, feel free to contact us at codedevbox@gmail.com.
