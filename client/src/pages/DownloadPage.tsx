import React from 'react';
import GradientButton from '../components/GradientButton';  // Assuming the path to the GradientButton component

const DownloadPage: React.FC = () => {
    const handleDownload = () => {
        // Logic for downloading or any other action can be added here
        alert("Download initiated!");  // Placeholder action
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <GradientButton label="Download" onClick={handleDownload} />
        </div>
    );
};

export default DownloadPage;
