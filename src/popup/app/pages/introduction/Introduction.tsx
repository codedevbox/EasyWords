import React from 'react';

/**
 * Introduction component for providing instructions to the user.
 * This component displays information to guide the user on how to start adding words to the list.
 * @returns {JSX.Element} Introduction component JSX.
 */
const Introduction: React.FC = () => {
    return (
        <div className="info-message">
            {/* Instruction message for the user */}
            <p>Add words to the list by double-clicking on a word on the page or selecting the desired phrase and pressing the add button.</p>
        </div>
    );
}

export default Introduction;
