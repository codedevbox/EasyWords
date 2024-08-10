/**
 * Custom hook for exporting data to a CSV file.
 * This hook provides a function to export an array of strings as CSV format and initiate the download.
 * @returns {Function} A function to export data to a CSV file.
 */
const useExportCSV = () => {
    /**
     * Exports the provided data to a CSV file and initiates the download.
     * @param {string[]} data - The array of strings to be exported.
     * @param {string} [filename='export.csv'] - The filename for the exported CSV file.
     */
    const exportCSV = (data: string[], filename = 'export.csv') => {
        const csvContent = "data:text/csv;charset=utf-8," + data.join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return exportCSV;
};

export default useExportCSV;
